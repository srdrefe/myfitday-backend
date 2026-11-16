const mongoose = require('mongoose');

const antrenmanSema = new mongoose.Schema({
    kullaniciId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kullanici', required: true },
    gun: { type: String, required: true },
    kasGrubu: { type: String, required: true },
    hareketler: [
        {
            isim: String,
            set: Number,
            tekrar: Number,
            agirlikKg: Number,       // EKLENDİ
            dinlenmeSuresi: Number   // EKLENDİ (Saniye cinsinden)
        }
    ],
    toplamHacim: { type: Number, default: 0 }, // EKLENDİ (O gün kaldırılan toplam ağırlık)
    tarih: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Antrenman', antrenmanSema);