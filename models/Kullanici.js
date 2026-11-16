const mangoose = require('mongoose');

const KullaniciSema = new mangoose.Schema({
    ad: {
        type: String,
        required: true
    },
    eposta: {
        type: String,
        required: true,
        unique: true // aynı eposta ile birden fazla kullanıcı kaydı olmasını engeller
    },
    sifre: {
        type: String,
        required: true
    },
    tarih: {
        type: Date,
        default: Date.now
    }
});

module.exports = mangoose.model('Kullanici', KullaniciSema);