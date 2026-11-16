<div align="center">

# 🏋️‍♂️ MyFitDay AI — Backend REST API

**Yapay Zeka Destekli Kişisel Sağlık, Kalori ve Antrenman Takip Servisi**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini%20AI-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)

</div>

---

## 📌 Proje Hakkında

**MyFitDay AI Backend**, hem mobil (Flutter) hem de web istemcilerine hizmet veren modüler bir RESTful API servisidir. Kullanıcıların günlük kalori ihtiyaçlarını bilimsel formüllerle hesaplamasını, antrenman ve beslenme kayıtlarını yönetmesini ve **Google Gemini AI** entegrasyonu üzerinden kişiselleştirilmiş sağlıklı yaşam tavsiyeleri almasını sağlar.

---

## ✨ Temel Özellikler

* 🤖 **Gemini AI Sağlık Koçu:** Kullanıcılardan gelen soruları yanıtlayan ve günlük sağlıklı yaşam görevleri üreten yapay zeka servisi.
* 🔥 **Kalori & BMR Hesaplama:** Harris-Benedict algoritması temel alınarak yaş, boy, kilo ve aktivite seviyesine göre kalori analizi.
* 💪 **Antrenman & Beslenme Yönetimi:** Günlük egzersiz programları ve öğün takibi için yapılandırılmış CRUD rotaları.
* 🗄️ **MongoDB Veri Katmanı:** Mongoose ODM ile şema tabanlı esnek ve hızlı veri depolama.
* 🛡️ **Güvenli Yapılandırma:** `dotenv` ile gizli anahtar yönetimi ve çoklu platform erişimi için `CORS` desteği.

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Çalışma Ortamı** | Node.js | Sunucu taraflı JavaScript çalışma zamanı |
| **Web Çatısı** | Express.js | Modüler yönlendirme (Routing) ve middleware yönetimi |
| **Veritabanı** | MongoDB & Mongoose | NoSQL veri depolama ve şema modelleme |
| **Yapay Zeka** | Google Gemini API | Doğal dil işleme ve dinamik içerik üretimi |
| **Güvenlik & Araçlar** | CORS, Dotenv | Ortam değişkenleri ve istemci erişim izinleri |

---

## 📂 Proje Dizini

```text
myfitday-backend/
├── middleware/         # İstek doğrulama ve ara katman yazılımları
├── models/             # Mongoose veritabanı şemaları
├── routes/             # Modüler API uç noktaları
│   ├── ai.js           # Gemini AI sohbet ve görev üretme rotaları
│   ├── antrenman.js    # Antrenman programı CRUD işlemleri
│   ├── beslenme.js     # Beslenme ve öğün takibi rotaları
│   ├── kalori.js       # Kalori hesaplama rotaları
│   └── auth.js         # Kullanıcı kayıt ve giriş işlemleri
├── .env                # Gizli API anahtarları ve veritabanı bağlantısı (Git'te gizli)
├── .gitignore          # Hariç tutulan dosya ve klasörler
├── index.js            # Sunucu giriş noktası
└── package.json        # Proje bağımlılıkları
```

---

## 🔌 API Uç Noktaları (Endpoints)

| Metot | Uç Nokta | Açıklama |
| :--- | :--- | :--- |
| `POST` | `/api/ai/sor` | Gemini AI asistanına mesaj gönderir ve yanıt alır |
| `POST` | `/api/register` / `/api/login` | Kullanıcı kayıt ve oturum açma işlemleri |
| `GET / POST` | `/api/kalori` | Kalori hesaplama ve geçmiş kayıt işlemleri |
| `GET / POST` | `/api/antrenman` | Antrenman programı oluşturma ve listeleme |
| `GET / POST` | `/api/beslenme` | Günlük beslenme kayıtlarını yönetme |

### Örnek Yapay Zeka İsteği (`POST /api/ai/sor`)

**İstek (Request Body):**
```json
{
  "mesaj": "Antrenman sonrası kas toparlanması için ne yemeliyim?"
}
```

**Yanıt (Response):**
```json
{
  "yanit": "Antrenman sonrası ilk 1 saat içinde kaliteli protein (tavuk, yumurta, lor peyniri veya whey) ve kompleks karbonhidrat (yulaf, pirinç) içeren bir öğün tüketmek kas onarımını hızlandırır."
}
```

---

## 🚀 Kurulum ve Yerelde Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/srdrefe/myfitday-backend
   cd myfitday-backend
   ```

2. **Gerekli paketleri yükleyin:**
   ```bash
   npm install
   ```

3. **Ortam değişkenlerini tanımlayın:**
   Ana dizinde `.env` adında bir dosya oluşturun ve kendi bilgilerinizi ekleyin:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<kullanici>:<sifre>@cluster.mongodb.net/myfitday
   GEMINI_API_KEY=senin_gemini_api_anahtarin
   ```

4. **Sunucuyu başlatın:**
   ```bash
   node index.js
   ```
   *Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışmaya başlayacaktır.*
