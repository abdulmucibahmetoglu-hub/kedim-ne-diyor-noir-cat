# TestFlight Adımları - TR

Bu akış Windows kullanan biri için hazırlanmıştır.

1. Node 22 kullan.
2. `npm install`
3. `npm run typecheck`
4. `npx expo-doctor`
5. RevenueCat iOS public SDK key'i EAS production environment'a ekle.
6. `eas login`
7. `eas build --platform ios --profile production`
8. Build tamamlanınca App Store Connect içinde TestFlight bölümünü kontrol et.
9. Internal tester ekle.
10. TestFlight uygulamasından build'i indirip dene.

## Notlar

- Build süresi internet bağlantısına ve Apple tarafındaki yoğunluğa göre değişebilir.
- iOS build yüklemesi App Store Connect tarafında birkaç dakika gecikmeli görünebilir.
- Gerçek RevenueCat anahtarları yalnız ortam değişkenlerinden veya EAS secrets üzerinden verilmelidir.
- App Store review'a göndermeden önce IAP ürünleri de review'a eklenmelidir.
