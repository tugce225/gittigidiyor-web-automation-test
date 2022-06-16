const { By } = require('selenium-webdriver');

/**
 * https://www.gittigidiyor.com arama için POM sınıfıdır.
 * @class
 * @constructor
 * @property {!ThenableWebDriver} driver
 */
class SearchResultPageObjectModel {
	driver;

	/**
	 *
	 * @param {!ThenableWebDriver} _driver
	 */
	constructor(_driver) {
		this.driver = _driver;
	}

	/**
	 * Arama sonucu sayfasındaki sayfalama butonlarını döner.
	 *
	 * @function
	 * @name getPaginationBtns
	 * @returns {Promise<!WebElementPromise[]>}
	 */
	async getPaginationBtns() {
		return this.driver.findElements(
			By.xpath('//li[@data-testid="pagination-list-item"]'),
		);
	}

	/**
	 * Arama sonucu sayfasındaki ürün kartlarını getirir.
	 *
	 * @function
	 * @name getAllProductCards
	 * @returns {Promise<!WebElementPromise[]>}
	 */
	async getAllProductCards() {
		return this.driver.findElements(
			By.xpath('//article[@data-cy="product-card-item"]'),
		);
	}

	/**
	 * İstenilen sıradaki sayfalama butonuna tıklar.
	 *
	 * @function
	 * @name clickPaginateBtn
	 * @param {number} index
	 * @returns {void}
	 */
	async clickPaginateBtn(index) {
		const buttons = await this.getPaginationBtns();
		const aElement = await buttons[index].findElement(By.xpath('.//a'));
		await this.driver.executeScript('arguments[0].click();', aElement);
	}

	/**
	 * İstenilen sıradaki ürün kartına tıklar.
	 *
	 * @function
	 * @name clickProductCard
	 * @param {number} index
	 * @returns {void}
	 */
	async clickProductCard(index) {
		const productCards = await this.getAllProductCards();
		const aElement = await productCards[index].findElement(
			By.xpath('.//a'),
		);
		await this.driver.executeScript('arguments[0].click();', aElement);
	}
}

module.exports = SearchResultPageObjectModel;
