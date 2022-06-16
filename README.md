# Selenium Web Otomasyon (E2E) Testi (gittigidiyor.com)
**gittigidiyor.com** web otomasyon testi projesidir. Javascript ile Jest, Selenium kullanılarak geliştirilmiştir.
Test akışı aşağıdaki şekildedir.

- **gittigidiyor.com** adresi tarayıcıda açılır
- Arama sayfasında **"bilgisayar"** kelimesi aratılır
- Sonuç sayfalarında **2. sayfa** butonuna tıklanır
- İkinci sayfada yer alan ürünlerde rasgele birine tıklanır
- Ürün detay sayfasındaki **ÜRÜN ADI** ve **FİYAT bilgisi** `logs/product-info.txt` dosyasına yazılır
- Ürün sepete eklenir
- Sepete eklenen ürünün bilgilerinin doğruluğu kontrol edilir
- Sepetteki ürün adeti güncellenir
- Ürün adetinin güncellenip güncellenmediği kontrol edilir
- Ürün sepetten çıkarılır
- Sepette ürün kalıp kalmadığı kontrol edilir

## Test
Projeyi çalıştırmak için aşağıdaki adımları sırası ile takip etmeniz yeterli olacaktır.
```bash
# Repoyu kopyalıyoruz
git clone git@github.com:tugce225/gittigidiyor-web-automation-test.git

# Bağımlılıları yüklüyoruz
cd gittigidiyor-web-automation-test
npm install
# ya da
yarn install

# Testi başlatıyoruz
npm run test
```

## Klasör Yapısı

```bash
├── logs # Log dosyalarını içerir
├── src
│   ├── tests # Test dosyalarını içerir
│   ├── configs
│   ├── models # POM dosyalarını içerir
│   ├── utils
│   ├── consts
```
