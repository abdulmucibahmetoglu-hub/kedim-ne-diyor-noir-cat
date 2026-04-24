# Kedim Ne Diyor? - Noir Cat MVP

Noir Cat temalı React Native + Expo mobil uygulaması. Uygulama dili Türkçedir; siyah arka plan, altın detaylar ve krem metinlerden oluşan premium görünüm korunur.

Bu sürümde gerçek AI modeli yoktur. Miyav analizi şimdilik mock analiz mantığıyla çalışır. Supabase ayarlanırsa kedi profili ve analiz geçmişi veritabanına yazılır; `.env` yoksa uygulama demo modda açılmaya devam eder.

## Gereksinimler

- Node.js 20 veya üzeri
- npm
- Expo Go veya iOS/Android simülatörü

## Kurulum

```bash
npm install
npx expo start
```

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

## Kontrol Komutları

```bash
npm run typecheck
npx expo-doctor
```

`npm run typecheck` TypeScript hatalarını, `npx expo-doctor` Expo SDK ve paket uyumluluğunu kontrol eder.
