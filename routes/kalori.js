const express = require('express');
const router = express.Router();

// Herkese açık kalori hesaplama rotası
router.post('/kalori-hesapla', (req, res) => {
    const { kilo, boy, yas, cinsiyet, hareketlilik, hedef, diyetTipi } = req.body;

    const boyMetre = boy / 100;
    const vki = (kilo / (boyMetre * boyMetre)).toFixed(1);
    
    let vkiDurumu = "Normal";
    if (vki < 18.5) vkiDurumu = "Zayıf";
    else if (vki > 24.9 && vki <= 29.9) vkiDurumu = "Fazla Kilolu";
    else if (vki > 29.9) vkiDurumu = "Obez";

    let bmr = cinsiyet === 'erkek'
        ? 88.362 + (13.397 * kilo) + (4.799 * boy) - (5.677 * yas)
        : 447.593 + (9.247 * kilo) + (3.098 * boy) - (4.330 * yas);
    const tdee = bmr * (hareketlilik || 1.2);

    let hedefKalori = tdee;
    if (hedef === 'kilo_ver') hedefKalori = tdee - 500;
    else if (hedef === 'kilo_al') hedefKalori = tdee + 400;

    let suIhtiyaciLitre = (kilo * 0.035);
    if (hareketlilik > 1.3) suIhtiyaciLitre += 0.5;

    let proteinYuzdesi = 0.30, karbYuzdesi = 0.45, yagYuzdesi = 0.25;
    if (diyetTipi === 'yuksek_protein') {
        proteinYuzdesi = 0.40; karbYuzdesi = 0.35; yagYuzdesi = 0.25;
    } else if (diyetTipi === 'dusuk_karb') {
        proteinYuzdesi = 0.35; karbYuzdesi = 0.25; yagYuzdesi = 0.40;
    }

    res.json({
        mesaj: "Kapsamlı Vücut Analizi Tamamlandı",
        analiz: { vki, durum: vkiDurumu, gunlukSuIhtiyaci: `${suIhtiyaciLitre.toFixed(2)} Litre` },
        enerji: { bmr: Math.round(bmr), gunlukIhtiyac: Math.round(tdee), hedefKalori: Math.round(hedefKalori) },
        makrolar: {
            tip: diyetTipi || 'standart',
            protein: `${Math.round((hedefKalori * proteinYuzdesi) / 4)}g`,
            karbonhidrat: `${Math.round((hedefKalori * karbYuzdesi) / 4)}g`,
            yag: `${Math.round((hedefKalori * yagYuzdesi) / 9)}g`
        }
    });
});

module.exports = router;