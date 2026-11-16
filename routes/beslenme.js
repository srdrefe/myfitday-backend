const express = require('express');
const router = express.Router();
const Beslenme = require('../models/Beslenme');
const tokenKontrol = require('../middleware/auth');

router.post('/beslenme', tokenKontrol, async (req, res) => {
    try {
        const veri = req.body;
        veri.kullaniciId = req.kullanici.id; 

        let toplamKalori = 0, toplamProtein = 0;
        if (veri.yiyecekler && veri.yiyecekler.length > 0) {
            veri.yiyecekler.forEach(yiyecek => {
                toplamKalori += (yiyecek.kalori || 0);
                toplamProtein += (yiyecek.proteinGram || 0);
            });
        }
        veri.ogunToplamKalori = toplamKalori;

        const yeniOgun = new Beslenme(veri);
        await yeniOgun.save();

        res.status(201).json({ mesaj: `Afiyet olsun! Bu öğünde toplam ${toplamKalori} kcal aldın.`, veri: yeniOgun });
    } catch (hata) {
        res.status(500).json({ mesaj: "Öğün kaydedilemedi.", hata: hata.message });
    }
});

router.get('/benim-beslenmem', tokenKontrol, async (req, res) => {
    try {
        const kullaniciOgunleri = await Beslenme.find({ kullaniciId: req.kullanici.id }).sort({ tarih: -1 });
        res.status(200).json(kullaniciOgunleri);
    } catch (hata) {
        res.status(500).json({ mesaj: "Beslenme günlüğü getirilemedi.", hata: hata.message });
    }
});

// ÖĞÜN GÜNCELLEME (PUT)
router.put('/beslenme/:id', tokenKontrol, async (req, res) => {
    try {
        let ogun = await Beslenme.findById(req.params.id);
        if (!ogun) return res.status(404).json({ mesaj: "Öğün bulunamadı." });
        
        if (ogun.kullaniciId.toString() !== req.kullanici.id) {
            return res.status(403).json({ mesaj: "Bu öğünü güncellemeye yetkiniz yok!" });
        }

        const veri = req.body;
        let toplamKalori = 0;
        if (veri.yiyecekler && veri.yiyecekler.length > 0) {
            veri.yiyecekler.forEach(y => toplamKalori += (y.kalori || 0));
        }
        veri.ogunToplamKalori = toplamKalori;

        ogun = await Beslenme.findByIdAndUpdate(req.params.id, veri, { new: true });
        res.status(200).json({ mesaj: "Öğün güncellendi!", veri: ogun });

    } catch (hata) {
        res.status(500).json({ mesaj: "Güncelleme hatası.", hata: hata.message });
    }
});

// ÖĞÜN SİLME (DELETE)
router.delete('/beslenme/:id', tokenKontrol, async (req, res) => {
    try {
        const ogun = await Beslenme.findById(req.params.id);
        if (!ogun) return res.status(404).json({ mesaj: "Öğün bulunamadı." });
        
        if (ogun.kullaniciId.toString() !== req.kullanici.id) {
            return res.status(403).json({ mesaj: "Bu öğünü silmeye yetkiniz yok!" });
        }

        await Beslenme.findByIdAndDelete(req.params.id);
        res.status(200).json({ mesaj: "Öğün başarıyla silindi." });

    } catch (hata) {
        res.status(500).json({ mesaj: "Silme hatası.", hata: hata.message });
    }
});

module.exports = router;