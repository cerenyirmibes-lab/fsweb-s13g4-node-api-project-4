require('dotenv').config(); // .env dosyasındaki PORT bilgisini okur
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware: JSON verilerini ve CORS isteklerini kabul etmemizi sağlar
app.use(express.json());
app.use(cors());

// Ödev gereksinimi: Port numarasını ortamdan (process.env) alıyoruz
const port = process.env.PORT || 5000;

// Basit bir bellek içi kullanıcı dizisi (Veritabanı yerine)
let kullanicilar = [];

// --- API ENDPOINTLERİ ---

// 1. GET /api/kullanıcılar -> Tüm kullanıcıları döndürür
app.get('/api/kullanıcılar', (req, res) => {
  res.json(kullanicilar);
});

// 2. POST /api/kayıtol -> Yeni kullanıcı oluşturur
app.post('/api/kayıtol', (req, res) => {
  const { kullaniciadi, sifre } = req.body;
  
  if (!kullaniciadi || !sifre) {
    return res.status(400).json({ message: "Kullanıcı adı ve şifre zorunludur!" });
  }

  const yeniKullanici = { id: Date.now(), kullaniciadi, sifre };
  kullanicilar.push(yeniKullanici);
  res.status(201).json(yeniKullanici);
});

// 3. POST /api/giriş -> Giriş kontrolü yapar
app.post('/api/giriş', (req, res) => {
  const { kullaniciadi, sifre } = req.body;
  
  const kullanici = kullanicilar.find(u => u.kullaniciadi === kullaniciadi && u.sifre === sifre);

  if (kullanici) {
    res.json({ message: `Hoşgeldin, ${kullaniciadi}!` });
  } else {
    res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre!" });
  }
});

// Sunucuyu ayağa kaldırıyoruz
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda aktif!`);
});