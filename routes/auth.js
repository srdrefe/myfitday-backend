const express = require('express');
const router = express.Router(); // Router nesnesini oluşturuyoruz
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Kullanici = require('../models/Kullanici');

// /api/kayit ROTASI
router.post('/kayit', async (req, res) => {
    try {
        const { ad, eposta, sifre } = req.body;
        const eskiKullanici = await Kullanici.findOne({ eposta });
        
        if (eskiKullanici) return res.status(400).json({ mesaj: "Bu e-posta kullanımda!" });

        const salt = await bcrypt.genSalt(10);
        const sifrelenmisSifre = await bcrypt.hash(sifre, salt);

        const yeniKullanici = new Kullanici({ ad, eposta, sifre: sifrelenmisSifre });
        await yeniKullanici.save();
        
        res.status(201).json({ mesaj: "Kullanıcı başarıyla oluşturuldu!" });
    } catch (hata) {
        res.status(500).json({ mesaj: "Kayıt işlemi başarısız.", hata: hata.message });
    }
});

// /api/giris ROTASI
router.post('/giris', async (req, res) => {
    try {
        const { eposta, sifre } = req.body;
        const kullanici = await Kullanici.findOne({ eposta });
        
        if (!kullanici) return res.status(404).json({ mesaj: "Kullanıcı bulunamadı!" });

        const sifreDogruMu = await bcrypt.compare(sifre, kullanici.sifre);
        if (!sifreDogruMu) return res.status(400).json({ mesaj: "Hatalı şifre!" });

        const token = jwt.sign(
            { id: kullanici._id, ad: kullanici.ad }, 
            'GIZLI_ANAHTAR_123', 
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            mesaj: "Giriş başarılı, hoş geldin " + kullanici.ad + "!",
            token: token
        });
    } catch (hata) {
        res.status(500).json({ mesaj: "Giriş işlemi başarısız.", hata: hata.message });
    }
});

module.exports = router;