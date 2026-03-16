# Login Form - Cypress E2E Test Projesi

React + Vite ile geliştirilmiş Login formu ve Cypress E2E testleri.

## Proje Kurulumu

```bash
npm install
```

## Geliştirme Sunucusu

```bash
npm run dev
```

## Cypress Testleri

GUI ile çalıştırmak için:
```bash
npm run cypress:open
```

Headless çalıştırmak için (önce `npm run dev` açık olmalı):
```bash
npm run cypress:run
```

## Proje Yapısı

```
src/
  components/
    Login.jsx       # Email, şifre ve şartları kabul formu
    Login.css
    Success.jsx     # Başarılı giriş sonrası sayfa
    Success.css
  main.jsx          # React Router kurulumu
  index.css

cypress/
  e2e/
    login.cy.js     # E2E test senaryoları
  support/
    commands.js
    e2e.js
```

## Form Validasyonları

- **Email**: Geçerli email formatı (regex)
- **Şifre**: En az 8 karakter, büyük/küçük harf, rakam ve özel karakter
- **Şartlar**: Checkbox işaretlenmeli
- Tüm validasyonlar geçilince Login butonu aktif hale gelir

## Test Senaryoları

1. ✅ Başarılı: Geçerli form doldurup submit → Success sayfasına yönlendirme
2. ❌ Hatalı email: 1 hata mesajı, doğru mesaj içeriği, buton disabled
3. ❌ Hatalı email + şifre: 2 hata mesajı, şifre hatası görünür
4. ❌ Şartlar kabul edilmedi: Buton disabled kalır
