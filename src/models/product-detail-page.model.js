const { By } = require('selenium-webdriver');

/**
 * https://www.gittigidiyor.com ürün detay için POM sınıfıdır.
 * @class
 * @constructor
 * @property {!ThenableWebDriver} driver
 */
class ProductDetailPageObjectModel {
	driver;

	/**
	 *
	 * @param {!ThenableWebDriver} _driver
	 */
	constructor(_driver) {
		this.driver = _driver;
	}

	/**
	 * Ürün detay sayfasınaki ürün adını döner.
	 *
	 * @function
	 * @name getProductName
	 * @returns {Promise<string>}
	 */
	async getProductName() {
		return this.driver
			.findElement(By.xpath('//h1[@id="sp-title"]'))
			.getText();
	}

	/**
	 * Ürün detay sayfasınaki ürün fiyatını döner.
	 *
	 * @function
	 * @name getProductPrice
	 * @returns {Promise<number>}
	 */
	async getProductPrice() {
		return this.driver
			.findElement(By.xpath('//span[@id="sp-price-highPrice"]'))
			.getText();
	}

	/**
	 * Sepete ekle butonunu döner.
	 *
	 * @function
	 * @name getAddToCartBtn
	 * @returns {Promise<!WebElementPromise>}
	 */
	async getAddToCartBtn() {
		return this.driver.findElement(
			By.xpath("//button[@id='add-to-basket']"),
		);
	}

	/**
	 * Sepet linki elemanını döner.
	 *
	 * @function
	 * @name getCartLink
	 * @returns {Promise<!WebElementPromise>}
	 */
	async getCartLinkElem() {
		return this.driver.findElement(By.className('header-cart-hidden-link'));
	}

	/**
	 * Sepet linkini döner.
	 *
	 * @function
	 * @name getCartLinkHref
	 * @returns {Promise<string>}
	 */
	async getCartLinkHref() {
		const linkElem = await this.getCartLinkElem();
		return linkElem.getAttribute('href');
	}

	/**
	 * Sağ üst köşedeki sepet popup elemanını gönder.
	 *
	 * @function
	 * @name getCartPopup
	 * @returns {Promise<!WebElementPromise>}
	 */
	async getCartPopup() {
		return await this.driver.findElement(
			By.className('header-cart-container'),
		);
	}

	/**
	 * Sepete ekle butonuna tıklar.
	 *
	 * @function
	 * @name clickAddToCart
	 * @returns {void}
	 */
	async clickAddToCart() {
		const addToCartBtn = await this.getAddToCartBtn();
		await this.driver.executeScript('arguments[0].click();', addToCartBtn);
	}

	/**
	 * Sepete linkine tıklar.
	 *
	 * @function
	 * @name clickCartLink
	 * @returns {void}
	 */
	async clickCartLink() {
		const cartLink = await this.getCartLinkElem();
		await this.driver.executeScript('arguments[0].click();', cartLink);
	}
}

module.exports = ProductDetailPageObjectModel;
