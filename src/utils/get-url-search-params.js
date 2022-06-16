/**
 * URL mentnindeki parametreleri döner.
 *
 * @function
 * @name getUrlSearchParams
 * @param {string} url
 * @returns {URLSearchParams}
 */
function getUrlSearchParams(url) {
	const parsedUrl = new URL(url);
	return parsedUrl.searchParams;
}

module.exports = getUrlSearchParams;
