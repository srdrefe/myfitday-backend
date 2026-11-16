require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. BU SATIRI EKLE

const app = express();
app.use(cors());
app.use(express.json());

// 1. Veritabanı Bağlantısı
 const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Bağlantısı Başarılı!'))
    .catch((err) => console.error('❌ Bağlantı Hatası:', err.message));

// 2. Modüler Rotaları Sisteme Bağlama
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/kalori'));
app.use('/api', require('./routes/antrenman'));
app.use('/api', require('./routes/beslenme'));
app.use('/api/ai', require('./routes/ai'));

// 3. Sunucuyu Başlatma
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} portunda çalışıyor.`);
});