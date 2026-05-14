# App Store Upload Checklist - TR

## Hesap ve Uygulama Kimliği

- Apple Developer hesabı aktif ve doğrulanmış olmalı.
- Bundle ID kontrolü: `com.noircat.kedimnediyor`
- App adı kontrolü: `Kedim Ne Diyor?`

## Görseller

- App icon kontrolü tamamlanmalı.
- Splash screen kontrolü tamamlanmalı.
- 6 App Store screenshot kontrolü tamamlanmalı.

## Yasal Gereksinimler

- Privacy policy URL gereksinimi karşılanmalı.
- Terms of use URL gereksinimi karşılanmalı.
  Yayina alinabilecek HTML tabani:
  `store/app-store-ready/privacy-policy-tr.html`
  `store/app-store-ready/terms-of-use-tr.html`

## Build ve Test

- TestFlight build kontrolü yapılmalı.
- App Review notları hazırlanmalı.
- Abonelik ürünleri kontrolü tamamlanmalı.
- RevenueCat iOS public SDK key EAS production environment içine eklenmeli.
- Yeni iOS binary `1.0 (6)` olarak hazırlanmalı.
- Premium ekranında App Store sandbox satın alma sheet'i açıldığı fiziksel cihaz kaydında gösterilmeli.

## Guideline 2.1(b) Düzeltme Kontrolü

- Mock ödeme başarı mesajı üretim build'inden kaldırıldı.
- Premium satın alma akışı RevenueCat SDK ile App Store IAP akışına bağlandı.
- IAP ürünleri App Store Connect içinde App Review'a gönderilmeli:
  - `premium_monthly`
  - `premium_yearly`
  - `premium_lifetime`
- Son operasyon adımları:
  `store/app-store-ready/revenuecat-eas-final-steps-tr.md`
