const jwt = require('jsonwebtoken');

const tokenKontrol = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ mesaj: "Erişim engellendi!" });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ mesaj: "Geçersiz format!" });

    try {
        const dogrulanmisKullanici = jwt.verify(token, 'GIZLI_ANAHTAR_123');
        req.kullanici = dogrulanmisKullanici;
        next();
    } catch (hata) {
        res.status(403).json({ mesaj: "Geçersiz veya süresi dolmuş token!" });
    }
};

module.exports = tokenKontrol; // Başka dosyalarda kullanılabilmesi için dışa aktarıyoruz