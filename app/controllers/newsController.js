const axios = require("axios");
const xml2js = require("xml2js");

const extractEsaImage = (description) => {
	const regex = /(https?:\/\/.*\.(?:png|jpg))/g;
	let img;
	let match;
	while ((match = regex.exec(description)) !== null) {
		img = match[0];
	}
	return img;
};

const parseXml = (data) =>
	xml2js.parseStringPromise(data, { explicitArray: false });

const newsController = {

	getAllNews: async(req, res) => {

		// FINAL VARIABLE TO SEND TO FRONT
		let formatedResult = [];

		// CURRENT INDEX OF NEWS TO FILTER AMOUNT (FRONT STATE CHANGE INDEX WHILE CLICK BUTTON "SEE MORE")
		const indexNews = parseInt(req.params.indexNews);
		let maxResults = indexNews + 4;

		// LINK TO RSS
		const [scienceEtAvenirRss, esaRss] = await Promise.all([
			axios.get("https://www.sciencesetavenir.fr/espace/rss.xml"),
			axios.get("https://www.esa.int/rssfeed/France"),
		]);
		// let lemondeRss = await axios("https://www.lemonde.fr/espace/rss_full.xml");

		// FUNCTION TO TRANSFORM XML TO JSON
		const jsonifyDatas = (source) => parseXml(source.data).catch((err) => {
			res.json(err + "error while transform xml file to json");
		});

		// FILTER SCIENCE ET AVENIR DATAS FROM JSON FILE
		let scienceEtAvenirJSON = await jsonifyDatas(scienceEtAvenirRss);
		let scienceEtAvenirDatas = scienceEtAvenirJSON.rss.channel.item;
		let slicedScienceEtAvenir = scienceEtAvenirDatas.slice(indexNews, maxResults);

		slicedScienceEtAvenir.map(({ title, description, link, enclosure, pubDate }) => {
			let img = enclosure.$.url;
			let source = "Sciences et avenir";
			formatedResult.push({title, description, link, img, pubDate, source});
		});

		// FILTER ESA DATAS FROM JSON FILE
		let esaJSON = await jsonifyDatas(esaRss);
		let esaDatas = esaJSON.rss.channel.item;
		let slicedesa = esaDatas.slice(indexNews, maxResults);

		slicedesa.map(({ title, description, link, pubDate }) => {
			let img = extractEsaImage(description);
			description = description.replace(/<\/?[^>]+(>|$)/g, "");
			let source = "ESA";
			formatedResult.push({title, description, link, img, pubDate, source});
		});

		// FILTER LE MONDE DATAS FROM JSON FILE
		// let lemondeJSON = await jsonifyDatas(lemondeRss);

		// let lemondeDatas = lemondeJSON.rss.channel.item;

		// let slicedLemonde = lemondeDatas.slice(indexNews, maxResults);

		// slicedLemonde.map(({ title, description, link, enclosure, pubDate }) => {
		// 	let img = enclosure.$.url;
		// 	let source = "Le Monde";
		// 	formatedResult.push({title, description, link, img, pubDate, source});
		// });

		// SENDING JSON WITH ALL COMPILED DATAS
		res.json(formatedResult);
	},

	getBySource: async(req, res) => {
		const source = req.params.source;
		const indexNews = parseInt(req.params.indexNews);
		let maxResults = indexNews + 4;

		if (!source) {
			return res.status(404).json({error: "not found"});
		}

		if (source === "sciencesetavenir") {

			const response = await axios.get("https://www.sciencesetavenir.fr/espace/rss.xml");

			const result = await parseXml(response.data);
			const results = result.rss.channel.item;
			let formatedResult = [];

			// MAP TO FILTER ELEMENTS REQUIRED FROM THE RECEIVED OBJECT
			results.map(({ title, description, link, enclosure, pubDate }) => {
				let img = enclosure.$.url;
				let source = "Sciences et avenir";
				formatedResult.push({title, description, link, img, pubDate, source});
			});

			return res.json(formatedResult.slice(indexNews, maxResults));

		} else if (source === "esa") {

			const response = await axios.get("https://www.esa.int/rssfeed/France");

			const result = await parseXml(response.data);
			const results = result.rss.channel.item;
			let formatedResult = [];

			// MAP TO FILTER ELEMENTS REQUIRED FROM THE RECEIVED OBJECT
			results.map(({ title, description, link, pubDate }) => {
				let img = extractEsaImage(description);
				let source = "ESA";
				formatedResult.push({title, description, link, img, pubDate, source});
			});

			return res.json(formatedResult.slice(indexNews, maxResults));

		// } else if (source === "lemonde") {
		// 	sourceUrl = "https://www.lemonde.fr/espace/rss_full.xml";

		// 	let results = null;

		// 	response = await axios(sourceUrl);

		// 	xml2js.parseString(response.data, { explicitArray : false }, function (err, result) {

		// 		results = result.rss.channel.item;
		// 		let formatedResult = [];

		// 		let finalArray = [];

		// 		// Rename the key media:content to media to be able to map on it
		// 		// tuto : https://jetrockets.pro/blog/rmvzzosmz9-rename-the-key-name-in-the-javascript-object
		// 		const renameKey = (object, key, newKey) => {

		// 			const clonedObj = clone(object);

		// 			const targetKey = clonedObj[key];

		// 			delete clonedObj[key];

		// 			clonedObj[newKey] = targetKey;

		// 			return clonedObj;
		// 		};

		// 		const clone = (obj) => Object.assign({}, obj);
		// 		for(const result of results) {
		// 			formatedResult.push(renameKey(result, "media:content", "media"));

		// 			formatedResult.map(({ title, description, link, media, pubDate }) => {
		// 				let img = media.$.url;
		// 				let source = "Le Monde";
		// 				finalArray.push({title, description, link, img, pubDate, source});
		// 			});
		// 		}

		// 		let maxResults = parseInt(indexNews)+4;

		// 		res.send(formatedResult.slice(indexNews, maxResults));
		// 	});
		}

		res.status(404).json({ error: "Source not found" });
	},

};

module.exports = newsController;
