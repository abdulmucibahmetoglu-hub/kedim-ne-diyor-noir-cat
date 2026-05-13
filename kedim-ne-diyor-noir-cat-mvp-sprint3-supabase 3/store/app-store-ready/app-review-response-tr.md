# App Review Yanıt Taslağı - TR

Bu metin App Store Connect > App Review Information > Notes alanına uyarlanarak eklenebilir.

## Screen Recording

Fiziksel cihaz ekran kaydı eklenecektir. Kayıt şu akışı göstermelidir:

1. Uygulamayı aç.
2. Kedi profili oluştur veya demo profil ile devam et.
3. Miyav analizi ekranına git.
4. Mikrofon iznini ver.
5. Kayıt başlat ve durdur.
6. Analiz sonucunu görüntüle.
7. Premium ekranını aç.
8. App Store sandbox satın alma sheet'ini göster.
9. Satın almayı geri yükle akışını göster.

## Uygulamanın Amacı

Kedim Ne Diyor?, kedi sahiplerinin kedilerinin miyavlarını, ruh hali ipuçlarını ve davranış geçmişini daha anlaşılır şekilde takip etmesine yardımcı olan Türkçe, Noir Cat temalı bir bakım ve eğlence uygulamasıdır.

Uygulama veteriner teşhisi vermez ve tıbbi tavsiye yerine geçmez. Analiz sonuçları kesin sonuç değil, kullanıcı tarafından kaydedilen ses ve seçilen bağlama göre üretilen destekleyici yorumlardır.

## Ana Özelliklere Erişim

Hesap oluşturma zorunlu değildir. İnceleme ekibi uygulamayı demo modda açıp ana özellikleri test edebilir.

Önerilen test akışı:

1. Ana sayfadan kedi profilini görüntüle.
2. "Analiz" sekmesine geç.
3. Miyav kaydı başlat/durdur.
4. Bağlam seç ve analiz sonucunu görüntüle.
5. "Raporlar" ekranında duygu haritasını incele.
6. "Kedime Söyle" ekranında metni miyav moduna çevir.
7. Premium ekranında abonelik seçeneklerini ve App Store sandbox satın alma sheet'ini incele.

Test kullanıcı bilgisi gerekiyorsa:

- E-posta: `[placeholder-review-email]`
- Şifre: `[placeholder-review-password]`

## Dış Servisler

- Supabase: kedi profili ve analiz geçmişi için opsiyonel veri saklama. Supabase ortam değişkenleri yoksa uygulama demo modda çalışır.
- RevenueCat: premium entitlement, App Store ürünleri, satın alma ve restore akışı.
- App Store In-App Purchase: ödeme, abonelik yenileme, iptal ve geri ödeme yönetimi.

Gerçek AI modeli kullanılmaz. Analizler bu sürümde uygulama içindeki mock analiz mantığıyla üretilir.

## Bölgesel Farklar

Uygulama tüm bölgelerde aynı özellik setiyle çalışır. Fiyat ve para birimi App Store tarafından kullanıcının bölgesine göre gösterilebilir.

## Regüle Sektör Durumu

Uygulama veteriner hizmeti, tıbbi teşhis veya sağlık hizmeti sunmaz. Bu nedenle regüle sağlık hizmeti yetki belgesi gerektiren bir servis olarak konumlandırılmamıştır.

## In-App Purchase Ürünleri

App Store Connect'te gönderilecek ürünler:

- `premium_monthly`: aylık abonelik
- `premium_yearly`: yıllık abonelik, 3 gün ücretsiz deneme
- `premium_lifetime`: ömür boyu tek seferlik satın alma

RevenueCat entitlement adı: `premium`.
