const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const { getUrlSearchParams, getRandNumber } = require('./../utils');
const { ProductLogger, Logger } = require('./../utils');

const {
	MainPageObjectModel,
	SearchResultPageObjectModel,
	ProductDetailPageObjectModel,
	CartPageObjectModel,
} = require('./../models');

const {
	PAGE_URL,
	BROWSER,
	SEARCH_TERM,
	PAGE_NUMBER_PARAM,
	SLEEP_TIME,
	PRODUCT_QUANTITY,
} = require('./../consts');
const { TARGET_PAGE_NUMBER } = require('../consts');

describe('[gittigidiyor.com] Sepet Test Senaryosu', () => {
	let driver;
	let mainPage;
	let searchResultPage;
	let productDetailPage;
	let cartPage;

	Logger.info('Sepet Test Senaryosu başlatıldı');

	beforeAll(async () => {
		driver = await new Builder().forBrowser(BROWSER).build();
		await driver.get(PAGE_URL);

		Logger.info(`URL ziyaret edildi: ${PAGE_URL}`);

		mainPage = new MainPageObjectModel(driver);
		searchResultPage = new SearchResultPageObjectModel(driver);
		productDetailPage = new ProductDetailPageObjectModel(driver);
		cartPage = new CartPageObjectModel(driver);
	});

	afterAll(async () => {
		Logger.info('Sepet Test Senaryosu tamamlandı');
		await driver.quit();
	});

	describe('2. sayfa butona tıklandığında', () => {
		test('Aktif sayfa numarası 2 olmalı', async () => {
			await mainPage.typeHeaderSearchInput(SEARCH_TERM);
			await mainPage.clickSearchFindButton();
			Logger.info(`[${SEARCH_TERM}] kelimesi aratıldı`);

			await searchResultPage.clickPaginateBtn(1);
			Logger.info('2. sayfa linkine tıklandı');

			const currentUrl = await driver.getCurrentUrl();
			const searchParams = getUrlSearchParams(currentUrl);
			const activePageNumber = Number(
				searchParams.get(PAGE_NUMBER_PARAM),
			);
			Logger.info(`Aktif sayfa numarası getirildi: ${activePageNumber}`);

			expect(activePageNumber).toBe(TARGET_PAGE_NUMBER);
		});
	});

	describe('Rastgele ürünlerden biri sepete eklendiğinde', () => {
		test('Ürün ve sepetteki ürün bilgileri aynı olmalı', async () => {
			const productCards = await searchResultPage.getAllProductCards();
			const randNumber = getRandNumber(1, productCards.length - 1);
			await searchResultPage.clickProductCard(randNumber);
			Logger.info(`${randNumber}. sıradaki ürün kartına tıklandı`);

			const productName = await productDetailPage.getProductName();
			const productPrice = await productDetailPage.getProductPrice();

			ProductLogger.info(`Ürün Adı: ${productName}`);
			ProductLogger.info(`Ürün Fiyatı: ${productPrice}`);
			Logger.info('Ürün bilgileri TXT dosyasına kaydedildi.');

			const cartPopup = await productDetailPage.getCartPopup();

			await productDetailPage.clickAddToCart();
			Logger.info('Sepete Ekle butonuna tıkladı');
			await driver.wait(until.elementIsVisible(cartPopup), SLEEP_TIME);
			Logger.info('Sepete popup elemanı görünür hale geldi');

			const cartURL = await productDetailPage.getCartLinkHref();
			Logger.info(`Sepet linkine ulaşıldı: ${cartURL}`);

			await productDetailPage.clickCartLink();
			Logger.info('Sepete git linkine tıklandı');

			await driver.wait(until.urlIs(cartURL));
			Logger.info('Sepete sayfası açıldı');

			const productNameInCart = await cartPage.getProductName();
			const productPriceInCart = await cartPage.getProductPrice();
			Logger.info('Sepetteki ürün adı ve fiyatına ulaşıldı');
			Logger.info(`Sepetteki ürün adı: ${productNameInCart}`);
			Logger.info(`Sepetteki ürün fiyatı: ${productPriceInCart}`);

			expect(productName.toLowerCase()).toEqual(
				productNameInCart.toLowerCase(),
			);
			expect(productPrice).toEqual(productPriceInCart);
		});
	});

	describe('Ürün adeti güncellendiğinde', () => {
		test('Ürün adet alanı 2 olmalı', async () => {
			await cartPage.updateProductQuantity(PRODUCT_QUANTITY);
			Logger.info('Sepetteki ürün adeti güncellendi (2 adet)');

			const productQuantity = await cartPage.getProductQuantity();
			Logger.info(`Sepetteki ürün adeti getirldi: ${productQuantity}`);

			expect(productQuantity).toEqual(PRODUCT_QUANTITY);
		});
	});

	describe('Ürün sepetten çıkarıldığında', () => {
		test('Sepet boş uyarı metni görünmeli', async () => {
			await cartPage.clickRemoveProductBtn();
			Logger.info('Sepetteki ürün siliniyor');

			await driver.sleep(1000);
			const emptyCartText = await cartPage.getEmptyCartText();
			Logger.info(`Boş sepet uyarısına ulaşıldı: ${emptyCartText}`);

			expect(emptyCartText.length).toBeGreaterThan(0);
		});
	});
});
