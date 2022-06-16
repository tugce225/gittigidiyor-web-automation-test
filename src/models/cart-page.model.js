const { By } = require('selenium-webdriver');

/**
 * https://www.gittigidiyor.com arama için POM sınıfıdır.
 * @class
 * @constructor
 * @property {!ThenableWebDriver} driver
 */
class CartPageObjectModel {
	driver;

	/**
	 *
	 * @param {!ThenableWebDriver} _driver
	 */
	constructor(_driver) {
		this.driver = _driver;
	}

	/**
	 * Sepete eklenmiş ürünün adını döner.
	 *
	 * @function
	 * @name getProductName
	 * @returns {Promise<string>}
	 */
	async getProductName() {
		const h2 = await this.driver.findElement(
			By.xpath('//div[@data-product]//h2'),
		);
		return h2.getText();
	}

	/**
	 * Sepete eklenmiş ürünün fiyatını döner.
	 *
	 * @function
	 * @name getProductPrice
	 * @returns {Promise<string>}
	 */
	async getProductPrice() {
		const priceDiv = await this.driver.findElement(
			By.xpath("//div[@data-product]//div[@class='total-price']"),
		);
		return priceDiv.getText();
	}

	/**
	 * Sepete eklenmiş ürünün fiyatını döner.
	 *
	 * @function
	 * @name getQuantitySelect
	 * @returns {Promise<!WebElementPromise>}
	 */
	async getQuantitySelect() {
		return this.driver.findElement(
			By.xpath('//div[@data-product]//select'),
		);
	}

	/**
	 * Sepete ekli ürünün silme butonunu döner.
	 *
	 * @function
	 * @name getRemoveBtn
	 * @returns {Promise<!WebElementPromise>}
	 */
	async getRemoveBtn() {
		return this.driver.findElement(
			By.xpath('//div[@data-product]//a[contains(@class,"btn-delete")]'),
		);
	}

	/**
	 * Boş sepet yazısını döner.
	 *
	 * @function
	 * @name getEmptyCartText
	 * @returns {Promise<string>}
	 */
	async getEmptyCartText() {
		const h2 = this.driver.findElement(
			By.xpath('//div[@class="clearfix"]//h2'),
		);
		return h2.getText();
	}

	/**
	 * Sepete eklenmiş ürünün adet bilgisini günceller.
	 *
	 * @function
	 * @name updateProductQuantity
	 * @param {number} quantity
	 * @returns {void}
	 */
	async updateProductQuantity(quantity) {
		const select = await this.getQuantitySelect();
		await select.click();
		await select.sendKeys(quantity);
	}

	/**
	 * Sepete eklenmiş ürünün adet bilgisini getirir.
	 *
	 * @function
	 * @name getProductQuantity
	 * @returns {number}
	 */
	async getProductQuantity() {
		const select = await this.getQuantitySelect();
		const value = await select.getAttribute('value');
		return Number(value);
	}

	/**
	 * Ürün silme butonuna tıklar.
	 *
	 * @function
	 * @name clickRemoveProductBtn
	 * @returns {void}
	 */
	async clickRemoveProductBtn() {
		const button = await this.getRemoveBtn();
		await this.driver.executeScript('arguments[0].click();', button);
	}
}

module.exports = CartPageObjectModel;
