/**
 * Verilen aralıkta rastgele sayı döner.
 *
 * @function
 * @name getRandNumber
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = getRandNumber;
