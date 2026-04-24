# Kedim Ne Diyor? — Noir Cat MVP Sprint 3

Bu paket Sprint 3 içindir. Supabase backend bağlantısı eklenmiştir.

## Kurulum

```bash
npm install
npx expo start
```

## Supabase bağlantısı

1. `.env.example` dosyasını kopyala.
2. Yeni dosya adı `.env` olsun.
3. İçine kendi Supabase bilgilerini yaz:

```env
EXPO_PUBLIC_SUPABASE_URL=https://senin-projen.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_veya_anon_key
```

## Eklenenler

- Supabase client
- Kedi profili kaydetme
- Analiz sonucu kaydetme
- Analiz geçmişini Supabase’den çekme
- Bakım görevleri için servis dosyası
- Demo mod bozulmadan çalışma
- Backend bağlantı test ekranı
- SQL tablo dosyası

## Önemli

Mobil uygulamaya asla `service_role` veya secret key koyma. Sadece publishable / anon key kullan.
