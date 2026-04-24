# Google Play Checklist - TR

## Hesap ve Erişim

- Google Play Console hesabı aktif olmalı.
- EAS CLI kurulmalı ve `eas login` ile giriş yapılmalı.
- Expo projesi doğru hesaba bağlı olmalı.

## Uygulama Kimliği

- App adı: `Kedim Ne Diyor?`
- Android package: `com.noircat.kedimnediyor`
- Google Play Console içinde aynı package ile uygulama açılmalı.
- Mikrofon, kamera ve fotoğraf izinleri mağaza formunda doğru açıklanmalı.

## Build

```bash
eas build --platform android --profile production
```

- Production profil Android App Bundle (`.aab`) üretir.
- Build tamamlandıktan sonra Play Console internal testing kanalına yüklenmeli.

## Internal Testing

- Internal testing track oluşturulmalı.
- Test kullanıcıları veya test listesi eklenmeli.
- Ana akışlar test edilmeli: kedi profili, miyav analizi, premium mock akış, demo mod, Supabase bağlantı testi.

## Data Safety Form

- Kedi profili verileri
- Miyav kayıtları
- Analiz geçmişi
- Premium abonelik durumu
- Supabase veri saklama kullanımı
- Gelecekte RevenueCat abonelik verileri

## Subscription Product Hazırlığı

- RevenueCat entitlement adı: `premium`
- RevenueCat paketleri: `monthly`, `yearly`, `lifetime`
- Google Play subscription product kayıtları hazırlanmalı.
- Gerçek RevenueCat API keyleri yalnız `.env` veya EAS secrets üzerinden verilmeli.
- Secret key veya Supabase `service_role` key kullanılmamalı.
