# TestFlight Checklist - TR

## Hesap ve Erişim

- Apple Developer hesabı aktif olmalı.
- App Store Connect erişimi doğrulanmalı.
- EAS CLI kurulmalı ve `eas login` ile giriş yapılmalı.
- Expo projesi doğru hesaba bağlı olmalı.

## Uygulama Kimliği

- App adı: `Kedim Ne Diyor?`
- Bundle ID: `com.noircat.kedimnediyor`
- App Store Connect içinde aynı Bundle ID ile uygulama açılmalı.
- Mikrofon, kamera ve fotoğraf izin açıklamaları Türkçe olmalı.

## Build

```bash
eas build --platform ios --profile production
```

- Build tamamlandıktan sonra EAS çıktısı kontrol edilmeli.
- Gerekirse `eas submit --platform ios --profile production` ile App Store Connect'e gönderilmeli.

## TestFlight

- TestFlight internal testing grubu oluşturulmalı.
- İlk build internal testing için seçilmeli.
- Test kullanıcıları eklenmeli.
- Ana akışlar test edilmeli: kedi profili, miyav analizi, RevenueCat premium satın alma/restore akışı, demo mod, Supabase bağlantı testi.

## Privacy Nutrition Labels

- Kedi profili verileri
- Miyav kayıtları
- Analiz geçmişi
- Premium abonelik durumu
- Supabase veri saklama kullanımı
- RevenueCat abonelik verileri

## Subscription Product Hazırlığı

- RevenueCat entitlement adı: `premium`
- RevenueCat paketleri: `monthly`, `yearly`, `lifetime`
- App Store Connect subscription product kayıtları hazırlanmalı.
- App Store Connect ürünleri App Review'a gönderilmeli.
- EAS production build için `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY` secret olarak tanımlanmalı.
- Gerçek RevenueCat API keyleri yalnız `.env` veya EAS secrets üzerinden verilmeli.
- Secret key veya Supabase `service_role` key kullanılmamalı.
