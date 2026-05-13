# Gizlilik Politikası Taslağı

Bu metin yayın öncesi taslaktır. Uygulama mağazalarında yayınlanmadan önce hukuki danışmanlık alınması önerilir.

## Uygulama

Kedim Ne Diyor?, kedilerin miyavlarını, davranışlarını ve bakım rutinlerini takip etmeye yardımcı olan Türkçe bir mobil uygulamadır.

## Toplanan Veriler

Uygulama deneyimini sunmak için aşağıdaki veri türleri işlenebilir:

- Kedi profili: kedi adı, cins, yaş, kilo, mama tipi ve kullanıcı notları.
- Miyav kayıtları: kullanıcının analiz için kaydettiği ses dosyası veya ses dosyası bağlantısı.
- Analiz geçmişi: analiz bağlamı, tahmin, güven skoru, açıklama, öneri, kayıt süresi ve kullanıcı geri bildirimi.
- Premium abonelik durumu: kullanıcının premium özelliklere erişim durumu ve günlük analiz hakkı bilgisi.
- Teknik veriler: uygulamanın çalışması için gereken cihaz içi local storage kayıtları.

## Supabase Kullanımı

Supabase, kedi profili ve analiz geçmişi gibi uygulama verilerini saklamak için kullanılabilir. Supabase bağlantısı yapılmadığında uygulama demo modda çalışır ve veriler örnek/mock akışta tutulur.

Mobil uygulamada yalnızca public Supabase anon key kullanılmalıdır. Service role veya secret key mobil uygulamaya eklenmez.

## RevenueCat Kullanımı

RevenueCat premium abonelik durumunu yönetmek için kullanılabilir. Bu durumda abonelik durumu, ürün bilgisi, satın alma ve geri yükleme durumu RevenueCat üzerinden işlenebilir. Gerçek ödeme işlemleri App Store veya Google Play tarafından yönetilir.

## Verilerin Kullanım Amaçları

Veriler şu amaçlarla kullanılabilir:

- Kedi profilini göstermek ve güncellemek
- Miyav analiz sonucu üretmek
- Analiz geçmişini kullanıcıya göstermek
- Premium özellik erişimini yönetmek
- Uygulama deneyimini iyileştirmek

## Veri Silme Talebi

Kullanıcılar verilerinin silinmesini talep edebilir. Silme talebi için uygulama destek kanalı veya yayıncı iletişim e-postası kullanılmalıdır. Talep alındığında, kimlik ve hesap doğrulaması sonrası Supabase üzerinde saklanan ilgili veriler silinir veya anonimleştirilir.

## Çocukların Gizliliği

Uygulama çocuklara özel olarak tasarlanmamıştır. Ebeveyn veya yasal vasi izni olmadan çocuklardan bilerek kişisel veri toplanması amaçlanmaz.

## Sağlık Uyarısı

Bu uygulama eğlence ve bakım desteği amaçlıdır. Veteriner teşhisi veya tıbbi tavsiye yerine geçmez.

## Değişiklikler

Bu gizlilik politikası taslağı ürün geliştikçe güncellenebilir. Yayınlanan son sürüm uygulama mağazası veya resmi destek sayfasında paylaşılmalıdır.
