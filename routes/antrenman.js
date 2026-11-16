const express = require('express');
const router = express.Router();
const Antrenman = require('../models/Antrenman'); // Bir üst klasöre çıkıp (..) models'e giriyoruz
const tokenKontrol = require('../middleware/auth');

router.post('/antrenman', tokenKontrol, async (req, res) => {
    try {
        const veri = req.body;
        veri.kullaniciId = req.kullanici.id; 

        let gunlukToplamHacim = 0;
        if (veri.hareketler && veri.hareketler.length > 0) {
            veri.hareketler.forEach(hareket => {
                const agirlik = hareket.agirlikKg || 0;
                gunlukToplamHacim += (hareket.set * hareket.tekrar * agirlik);
            });
        }
        veri.toplamHacim = gunlukToplamHacim;

        const yeniAntrenman = new Antrenman(veri);
        await yeniAntrenman.save(); 
        
        res.status(201).json({ mesaj: `Harika! Bugün toplam ${gunlukToplamHacim} kg ağırlık kaldırdın.`, veri: yeniAntrenman });
    } catch (hata) {
        res.status(500).json({ mesaj: "Kayıt sırasında hata oluştu", hata: hata.message });
    }
});

router.get('/benim-antrenmanlarim', tokenKontrol, async (req, res) => {
    try {
        const kullaniciAntrenmanlari = await Antrenman.find({ kullaniciId: req.kullanici.id }).sort({ tarih: -1 });
        res.status(200).json(kullaniciAntrenmanlari);
    } catch (hata) {
        res.status(500).json({ mesaj: "Antrenmanlar getirilemedi.", hata: hata.message });
    }
});

// ANTRENMAN GÜNCELLEME (PUT)
router.put('/antrenman/:id', tokenKontrol, async (req, res) => {
    try {
        // 1. Antrenmanı bul ve sana ait olup olmadığını kontrol et (Güvenlik)
        let antrenman = await Antrenman.findById(req.params.id);
        if (!antrenman) return res.status(404).json({ mesaj: "Antrenman bulunamadı." });
        
        if (antrenman.kullaniciId.toString() !== req.kullanici.id) {
            return res.status(403).json({ mesaj: "Bu antrenmanı güncellemeye yetkiniz yok!" });
        }

        // 2. Yeni verilerle toplam hacmi tekrar hesapla
        const veri = req.body;
        let gunlukToplamHacim = 0;
        if (veri.hareketler && veri.hareketler.length > 0) {
            veri.hareketler.forEach(hareket => {
                const agirlik = hareket.agirlikKg || 0;
                gunlukToplamHacim += (hareket.set * hareket.tekrar * agirlik);
            });
            veri.toplamHacim = gunlukToplamHacim;
        }

        // 3. Güncellemeyi kaydet
        antrenman = await Antrenman.findByIdAndUpdate(req.params.id, veri, { new: true });
        res.status(200).json({ mesaj: "Antrenman başarıyla güncellendi!", veri: antrenman });

    } catch (hata) {
        res.status(500).json({ mesaj: "Güncelleme hatası.", hata: hata.message });
    }
});

// ANTRENMAN SİLME (DELETE)
router.delete('/antrenman/:id', tokenKontrol, async (req, res) => {
    try {
        const antrenman = await Antrenman.findById(req.params.id);
        if (!antrenman) return res.status(404).json({ mesaj: "Antrenman bulunamadı." });
        
        if (antrenman.kullaniciId.toString() !== req.kullanici.id) {
            return res.status(403).json({ mesaj: "Bu antrenmanı silmeye yetkiniz yok!" });
        }

        await Antrenman.findByIdAndDelete(req.params.id);
        res.status(200).json({ mesaj: "Antrenman veritabanından başarıyla silindi." });

    } catch (hata) {
        res.status(500).json({ mesaj: "Silme hatası.", hata: hata.message });
    }
});

module.exports = router;