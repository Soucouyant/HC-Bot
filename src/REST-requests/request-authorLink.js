const fetch = require("node-fetch");

module.exports = async function (apiLink) {
	const repoInfo = await fetch(apiLink).then((response) => response.json());
	const authorLink = await repoInfo.owner.html_url;
	return authorLink;
};
