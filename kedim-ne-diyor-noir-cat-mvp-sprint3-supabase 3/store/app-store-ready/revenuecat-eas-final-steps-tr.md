# RevenueCat + EAS Final Gönderim Adımları - TR

Bu dosya Apple'ın Guideline 2.1(b) geri dönüşünü kapatmak için izlenecek son operasyon adımlarını listeler.

## 1. RevenueCat Dashboard

RevenueCat içinde aynı proje/app altında şu yapı kurulmalıdır:

- App platformu: iOS
- Bundle ID: `com.noircat.kedimnediyor`
- Entitlement: `premium`
- Offering: current/default offering
- Paketler:
  - `monthly` -> `premium_monthly`
  - `yearly` -> `premium_yearly`
  - `lifetime` -> `premium_lifetime`

RevenueCat iOS public SDK key değeri `appl_...` formatında alınmalıdır. Bu key repo içine yazılmamalıdır.

## 2. EAS Production Environment

RevenueCat iOS public SDK key, EAS production environment içine eklenmelidir:

```bash
npx eas-cli env:create production \
  --name EXPO_PUBLIC_REVENUECAT_IOS_API_KEY \
  --value "appl_REVENUECAT_IOS_PUBLIC_SDK_KEY" \
  --visibility sensitive \
  --non-interactive
```

Kontrol:

```bash
npx eas-cli env:list production --format long
```

Beklenen sonuç:

- `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY` production ortamında görünür.
- Değer terminalde açıkça yazdırılmasa bile değişken kayıtlı olmalıdır.

## 3. App Store Connect IAP Ürünleri

App Store Connect içinde ürünler App Review'a gönderilmeden yeni binary gönderilmemelidir.

Auto-renewable subscription ürünleri:

- Product ID: `premium_monthly`
  - Display name: `Premium Noir Cat Aylık`
  - Süre: 1 ay
  - Fiyat: `149,99 TL`
- Product ID: `premium_yearly`
  - Display name: `Premium Noir Cat Yıllık`
  - Süre: 1 yıl
  - Fiyat: `999,00 TL`
  - Introductory offer: 3 gün ücretsiz deneme

Non-consumable ürün:

- Product ID: `premium_lifetime`
  - Display name: `Premium Noir Cat Ömür Boyu`
  - Fiyat: `1.999,00 TL`

Her ürün için App Review screenshot yüklenmelidir. Premium ekran screenshot'u kullanılabilir:

```text
store/final-screenshots/screenshot-06-premium.png
```

## 4. Yeni iOS Build

Kod tarafında iOS build number `6` olarak ayarlandı.

RevenueCat key ve IAP ürünleri hazır olduktan sonra:

```bash
npm run typecheck
npx expo-doctor
npx eas-cli build --platform ios --profile production --non-interactive
```

Build tamamlanınca App Store Connect'e gönder:

```bash
npx eas-cli submit --platform ios --profile production --latest --non-interactive
```

## 5. App Review Information

App Store Connect > App Review Information > Notes alanı için taslak:

```text
store/app-store-ready/app-review-response-tr.md
```

Screen recording fiziksel cihazda alınmalı ve şu akışı göstermelidir:

1. Uygulama açılışı
2. Kedi profili
3. Mikrofon izni
4. Miyav kaydı başlat/durdur
5. Analiz sonucu
6. Premium ekranı
7. App Store sandbox satın alma sheet'i
8. Restore purchases akışı

## 6. Gönderim Öncesi Son Kontrol

- Paid Apps Agreement aktif.
- `premium_monthly`, `premium_yearly`, `premium_lifetime` ürünleri App Review'a ekli.
- RevenueCat entitlement `premium` aktif.
- RevenueCat offering içinde üç paket eşleşmiş.
- EAS production environment içinde `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY` kayıtlı.
- Yeni binary `1.0 (6)` App Store Connect'e yüklenmiş.
- App Review Notes güncellenmiş.
- Screen recording eklenmiş.
