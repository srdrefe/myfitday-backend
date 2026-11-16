const mongoose = require('mongoose');

const beslenmeSema = new mongoose.Schema({
    // Bu veri kime ait? (Kullanici modeliyle ilişkilendirme)
    kullaniciId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Kullanici', 
        required: true 
    },
    ogunTipi: { 
        type: String, 
        required: true // Örn: Kahvaltı, Öğle, Akşam, Ara Öğün
    },
    yiyecekler: [
        {
            isim: String,         // Örn: Yulaf Ezmesi
            kalori: Number,
            proteinGram: Number,
            karbGram: Number,
            yagGram: Number
        }
    ],
    ogunToplamKalori: { type: Number, default: 0 },
    tarih: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Beslenme', beslenmeSema);