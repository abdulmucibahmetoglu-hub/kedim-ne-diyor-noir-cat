# Subscription Products Planı - TR

## RevenueCat ve Entitlement

- Entitlement: `premium`

## App Store Connect Ürün Kimlikleri

- Monthly subscription product id: `premium_monthly`
- Yearly subscription product id: `premium_yearly`
- Lifetime non-consumable product id: `premium_lifetime`

## Fiyatlandırma

- Aylık: `149,99 TL`
- Yıllık: `999,00 TL`
- Ömür boyu: `1.999,00 TL`

## Deneme Notu

- Yıllık plan için `3 gün ücretsiz deneme` tanımlanmalı.
- Deneme App Store Connect subscription offer/introductory offer alanından yapılandırılmalıdır.

## RevenueCat Eşleştirme Notu

App Store Connect ürün id'leri RevenueCat dashboard içinde entitlement `premium` altında eşleştirilmelidir. Uygulama RevenueCat SDK ile gerçek satın alma ve restore çağrılarını kullanır.

Önerilen RevenueCat paketleri:

- `monthly` -> `premium_monthly`
- `yearly` -> `premium_yearly`
- `lifetime` -> `premium_lifetime`

## App Store Review Gereksinimleri

- Paid Apps Agreement aktif olmalı.
- Her ürün için ad, açıklama, fiyat ve App Review screenshot girilmeli.
- Ürünler uygulama build'iyle birlikte App Review'a gönderilmeli.
- Yeni iOS binary build number: `6`.
