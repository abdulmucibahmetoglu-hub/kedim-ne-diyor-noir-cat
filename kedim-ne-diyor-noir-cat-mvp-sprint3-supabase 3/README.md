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

Premium ekranındaki planlar mock ödeme akışıyla çalışır. "3 Gün Ücretsiz Dene" veya plan kartlarına basınca kullanıcı premium olur; gerçek ödeme alınmaz. "Satın almayı geri yükle" de şimdilik mock restore yapar.

RevenueCat entegrasyonu henüz bağlanmadı. Bunun için placeholder servis dosyası hazırdır:

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

Sprint 5 paketi gerçek ödeme entegrasyonu eklemez. RevenueCat ileride bağlanacak şekilde Sprint 4 placeholder servisi korunur.

## Kontrol Komutları

```bash
npm run typecheck
npx expo-doctor
```

`npm run typecheck` TypeScript hatalarını, `npx expo-doctor` Expo SDK ve paket uyumluluğunu kontrol eder.
