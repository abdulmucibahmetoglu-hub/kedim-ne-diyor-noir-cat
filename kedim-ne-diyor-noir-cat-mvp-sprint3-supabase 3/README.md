# Kedim Ne Diyor? - Noir Cat MVP

Noir Cat temalı React Native + Expo mobil uygulaması. Uygulama dili Türkçedir; siyah arka plan, altın detaylar ve krem metinlerden oluşan premium görünüm korunur.

Bu sürümde gerçek AI modeli yoktur. Miyav analizi şimdilik mock analiz mantığıyla çalışır. Supabase ayarlanırsa kedi profili ve analiz geçmişi veritabanına yazılır; `.env` yoksa uygulama demo modda açılmaya devam eder.

## Gereksinimler

- Node.js 22 LTS önerilir (`.nvmrc` dosyası `22` olarak ayarlı)
- npm
- Expo Go veya iOS/Android simülatörü

## Kurulum

```bash
npm install
npx expo start
```

Node 24/25 ile Expo CLI otomatik port taramasında hata verebilir. Böyle bir durumda Node 22 LTS'e geçip komutları tekrar çalıştır.

Metro açıldıktan sonra terminaldeki QR kodu Expo Go ile okutabilir ya da `i`, `a`, `w` kısayollarıyla iOS, Android veya web hedefini başlatabilirsin.

## Supabase Olmadan Çalıştırma

Hiçbir `.env` dosyası oluşturmadan uygulamayı açabilirsin. Bu durumda:

- Demo kedi profili kullanılır.
- Analizler mock veriyle oluşturulur.
- Supabase bağlantı testi "Demo mod aktif" mesajı gösterir.
- Mobil uygulama açılışı engellenmez.

## Supabase Bağlantısı

1. `.env.example` dosyasını `.env` olarak kopyala.
2. Supabase projenin URL ve anon key değerlerini gir.
3. `supabase/schema.sql` dosyasındaki tabloları Supabase SQL Editor içinde çalıştır.
4. Uygulamayı yeniden başlat.

```env
EXPO_PUBLIC_SUPABASE_URL=https://senin-projen.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_veya_anon_key
```

Mobil uygulamada yalnızca `EXPO_PUBLIC_SUPABASE_URL` ve `EXPO_PUBLIC_SUPABASE_ANON_KEY` kullanılmalıdır. `service_role`, secret key veya sunucu tarafı anahtarları asla `.env` dosyasına eklenmemelidir.

## Ana Ekranlar

- Açılış ve kedi profili oluşturma
- Ana sayfa ve Supabase bağlantı testi
- Mikrofon izniyle miyav kaydı ve mock analiz
- Analiz sonucu ve geri bildirim
- Ses kütüphanesi
- Foto/video analiz mock ekranı
- Rapor ekranı
- Profil ve bakım takvimi
- Premium teklif ekranı

## Sprint 4 - Premium Kilitler

Premium olmayan kullanıcılar günde 3 ücretsiz miyav analizi yapabilir. Hak dolduğunda analiz ekranı kullanıcıyı Premium teklifine yönlendirir. Kalan hak ana sayfada ve analiz ekranında gösterilir.

Premium durum ve günlük analiz hakkı cihazdaki local storage içinde tutulur. Uygulama yeniden açıldığında premium durumu korunur.

Premium kilitli özellikler:

- Foto / Video Analizi
- Çoklu kedi profili
- 7 günden uzun analiz geçmişi
- Kediye özel AI hafıza

Premium ekranındaki planlar RevenueCat üzerinden App Store / Google Play satın alma akışına bağlanacak şekilde hazırlanmıştır. Üretim build'inde mock ödeme başarı mesajı gösterilmez; plan kartları gerçek mağaza satın alma sheet'ini açar.

`.env` olmadan geliştirme sırasında premium kilitlerini denemek için yalnızca development modunda görünen demo premium butonu kullanılabilir. Bu buton App Store build'inde görünmez.

Premium servis dosyası:

```text
src/services/premiumService.ts
```

## Sprint 5 - Yayın Hazırlık Paketi

App Store ve Google Play yayın hazırlığı için Türkçe mağaza metinleri, hukuki taslaklar ve görsel üretim planları eklendi.

Mağaza dosyaları:

- `store/app-store-description-tr.md`
- `store/google-play-description-tr.md`
- `store/keywords-tr.md`
- `store/release-notes-tr.md`
- `store/privacy-policy-tr.md`
- `store/terms-of-use-tr.md`
- `store/screenshots-plan-tr.md`

Asset placeholder dosyaları:

- `assets/icon-placeholder.md`
- `assets/splash-placeholder.md`

Hukuki metinler taslaktır. App Store veya Google Play yayını öncesinde gizlilik politikası ve kullanım şartları hukuki danışmanlıkla gözden geçirilmelidir.

Sprint 5 paketi yayın metinleri ve hukuki taslakları kapsar. Güncel premium satın alma akışı RevenueCat servis dosyası üzerinden yönetilir.

## Sprint 6 - EAS ve TestFlight Hazırlığı

RevenueCat hazırlığı üretim yapısına yaklaştırıldı. Gerçek RevenueCat API keyleri repo içine yazılmamalı; `.env` veya EAS secrets üzerinden verilmelidir.

RevenueCat hazırlığı:

- Entitlement adı: `premium`
- Paketler: `monthly`, `yearly`, `lifetime`
- Placeholder env alanları: `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY`, `EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY`
- App Store ürün id'leri: `premium_monthly`, `premium_yearly`, `premium_lifetime`

EAS build profilleri `eas.json` içinde hazırdır:

- `development`: development client ve internal dağıtım
- `preview`: internal test build
- `production`: App Store/TestFlight ve Google Play için production build

TestFlight hazırlığı:

```bash
eas login
eas build --platform ios --profile production
```

Google Play internal testing hazırlığı:

```bash
eas login
eas build --platform android --profile production
```

Yayın checklistleri:

- `store/testflight-checklist-tr.md`
- `store/google-play-checklist-tr.md`

RevenueCat kullanmadan önce App Store Connect ve Google Play Console içinde ürün kayıtları hazırlanmalı, RevenueCat dashboard içinde `premium` entitlement ve `monthly`, `yearly`, `lifetime` paketleri eşleştirilmelidir.

## Sprint 7 - Görsel Hazırlık Paketi

App Store, Google Play ve sosyal medya yayınları için görsel plan ve üretim promptları eklendi. Bu sprintte gerçek görsel üretilmez; yalnızca üretim briefleri, screenshot metinleri ve reklam metinleri hazırlanır.

Görsel hazırlık dosyaları:

- `store/visual-assets-plan-tr.md`
- `store/screenshot-copy-tr.md`
- `store/social-ad-copy-tr.md`
- `assets/icon-generation-prompt.md`
- `assets/splash-generation-prompt.md`

Noir Cat görsel dili korunur: siyah lüks zemin, altın minimal kedi/pati/ses dalgası, krem destek metin ve premium yüksek kontrast.

Final splash screen eklendi: `assets/splash.png`. Expo splash ayarları `contain` resize mode ve `#050505` arka plan rengiyle bağlandı.

Final App Store screenshot seti hazırlandı. Teslim klasoru: `store/final-screenshots/`

App Store Connect yukleme sirasi:

1. `screenshot-01-home.png`
2. `screenshot-02-analysis.png`
3. `screenshot-03-result.png`
4. `screenshot-04-mood-map.png`
5. `screenshot-05-talk-to-cat.png`
6. `screenshot-06-premium.png`

## Sprint 8 - App Store ve TestFlight Hazırlığı

Bu sprintte odak yalnız iOS App Store ve TestFlight yayın hazırlığıdır. Google Play tarafı beklemede bırakılmıştır.

App Store readiness dosyaları:

- `store/app-store-ready/app-store-upload-checklist-tr.md`
- `store/app-store-ready/testflight-steps-tr.md`
- `store/app-store-ready/app-review-notes-tr.md`
- `store/app-store-ready/app-review-response-tr.md`
- `store/app-store-ready/app-privacy-answers-tr.md`
- `store/app-store-ready/subscription-products-plan-tr.md`
- `store/app-store-ready/revenuecat-eas-final-steps-tr.md`

Bu paket:

- App Store yükleme checklistini
- Windows üzerinden TestFlight build adımlarını
- Apple App Review not taslağını
- App Store privacy form cevap taslağını
- App Store Connect abonelik ürün planını

tek yerde toplar.

## Sprint 10 - RevenueCat Satın Alma Düzeltmesi

Apple incelemesindeki mock ödeme reddini çözmek için premium satın alma ekranı RevenueCat SDK ile gerçek mağaza akışına bağlandı. iOS build number `6` yapıldı; App Store review için yeni binary yüklenmelidir.

Premium ürün planı:

- Entitlement: `premium`
- Aylık abonelik: `premium_monthly`
- Yıllık abonelik: `premium_yearly`
- Ömür boyu erişim: `premium_lifetime`

Önemli yayın notları:

- App Store Connect'te Paid Apps Agreement aktif olmalıdır.
- In-App Purchase ürünleri App Review için gönderilmelidir.
- Her IAP ürünü için App Review screenshot eklenmelidir.
- RevenueCat dashboard içinde ürünler `premium` entitlement altında eşleştirilmelidir.
- Production/TestFlight build için `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY` EAS secret olarak tanımlanmalıdır.
- Apple Guideline 2.1(b) düzeltmesi için son RevenueCat + EAS adımları `store/app-store-ready/revenuecat-eas-final-steps-tr.md` dosyasındadır.

## Kontrol Komutları

```bash
npm run typecheck
npx expo-doctor
```

`npm run typecheck` TypeScript hatalarını, `npx expo-doctor` Expo SDK ve paket uyumluluğunu kontrol eder.
