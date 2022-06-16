const { By } = require('selenium-webdriver');

/**
 * https://www.gittigidiyor.com anasayfası için POM sınıfıdır.
 * @class
 * @constructor
 * @property {!ThenableWebDriver} driver
 */
class MainPageObjectModel {
	driver;

	/**
	 *
	 * @param {!ThenableWebDriver} _driver
	 */
	constructor(_driver) {
		this.driver = _driver;
	}

	/**
	 * Anasayfadaki arama çubuğunun input elemanını
	 * döndürür.
	 *
	 * @function
	 * @name getHeaderSearchInput
	 * @returns {Promise<!WebElementPromise>}
	 */
	async getHeaderSearchInput() {
		return this.driver.findElement(
			By.xpath('//input[@data-cy="header-search-input"]'),
		);
	}

	/**
	 * Anasayfadaki arama çubuğunun button elemanını
	 * döndürür.
	 *
	 * @function
	 * @name getSearchFindButton
	 * @returns {Promise<!WebElementPromise>}
	 */
	async getSearchFindButton() {
		return this.driver.findElement(
			By.xpath('//button[@data-cy="search-find-button"]'),
		);
	}

	/**
	 * Arama çubuğuna istenen metni yazdırır.
	 *
	 * @function
	 * @name typeHeaderSearchInput
	 * @param {string} text
	 * @returns {void}
	 */
	async typeHeaderSearchInput(text) {
		const input = await this.getHeaderSearchInput();
		await input.sendKeys(text);
	}

	/**
	 * Arama çubuğundaki buton tıklar.
	 *
	 * @function
	 * @name clickSearchFindButton
	 * @returns {void}
	 */
	async clickSearchFindButton() {
		const button = await this.getSearchFindButton();
		await button.click();
	}
}

module.exports = MainPageObjectModel;
