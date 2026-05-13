# App Review Notları Taslağı - TR

Kedim Ne Diyor?, eğlence ve bakım desteği amaçlı bir mobil uygulamadır. Uygulama veteriner teşhisi vermez.

AI analizleri kesin sonuç değildir. Uygulamadaki yorumlar, kullanıcı tarafından kaydedilen miyav sesi ve seçilen bağlama göre öneri niteliğinde sunulur.

## İnceleme Ekibi İçin Demo Akışı

1. Kedi profili oluştur.
2. Miyav analizi ekranına git.
3. Kayıt başlat/durdur.
4. Analiz sonucunu gör.
5. Premium ekranına git.
6. Aylık, yıllık veya ömür boyu plandan birini seçerek App Store sandbox satın alma sheet'ini aç.
7. "Satın almayı geri yükle" butonuyla restore akışını kontrol et.

## Premium İnceleme Notu

Premium satın alma akışı RevenueCat üzerinden App Store sandbox satın alma sheet'ine yönlenir. Üretim/TestFlight build'inde mock ödeme başarı mesajı gösterilmez.

App Store Connect'te gönderilmesi gereken ürünler:

- `premium_monthly`
- `premium_yearly`
- `premium_lifetime`

## Test Kullanıcı Bilgisi Placeholder

- E-posta: `[placeholder-review-email]`
- Şifre: `[placeholder-review-password]`
- Not: Gerçek hesap gerekiyorsa buraya App Review için ayrılmış test kullanıcı bilgileri eklenmelidir.

## Dış Servisler

- Supabase: kedi profili ve analiz geçmişi için opsiyonel veri saklama. `.env` yoksa demo mod çalışır.
- RevenueCat: premium entitlement ve App Store satın alma / restore akışı.
- App Store In-App Purchase: ödeme, abonelik yenileme, iptal ve geri ödeme yönetimi.

## Bölgesel Farklar

Uygulama tüm bölgelerde aynı özellik setiyle çalışır. Mağaza fiyatları ve para birimi App Store tarafından kullanıcının bölgesine göre gösterilebilir.
