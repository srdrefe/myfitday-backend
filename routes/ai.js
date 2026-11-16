const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/sor', async (req, res) => {
    try {
        const { mesaj } = req.body;

        if (!mesaj) {
            return res.status(400).json({ mesaj: "Lütfen bir mesaj yazın." });
        }

        // Google'ın kabul ettiği tek güncel model: gemini-3.8-flash
        const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: "Sen MyFitDay AI adlı genç, dinamik ve samimi bir yaşam koçusun. Fitness ve beslenme üzerine kısa ve motive edici yanıtlar ver. Soru: " + mesaj }
                    ]
                }
            ]
        });

        res.json({ yanit: response.text });

    } catch (hata) {
        console.error("Yapay Zeka Hatası:", hata);
        
        // Google sunucuları yoğunsa (503), kullanıcıya şık bir uyarı veriyoruz
        if (hata.message && hata.message.includes('503')) {
            return res.status(503).json({ mesaj: "Google Yapay Zeka sunucuları şu an çok yoğun. Lütfen 1 dakika sonra tekrar dene! ⏳" });
        }
        
        res.status(500).json({ mesaj: "Yapay zeka hatası: " + hata.message });
    }
});

module.exports = router;