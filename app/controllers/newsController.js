const axios = require("axios");
const xml2js = require("xml2js");

const handleQuizController = {

	getAllNews: async(req, res) => {

		// FINAL VARIABLE TO SEND TO FRONT
		let formatedResult = [];

		// CURRENT INDEX OF NEWS TO FILTER AMOUNT (FRONT STATE CHANGE INDEX WHILE CLICK BUTTON "SEE MORE")
		const indexNews = req.params.indexNews;
		let maxResults = parseInt(indexNews)+4;

		// LINK TO RSS
		let scienceEtAvenirRss = await axios("https://www.sciencesetavenir.fr/espace/rss.xml");
		let esaRss = await axios("https://www.esa.int/rssfeed/France");
		let lemondeRss = await axios("https://www.sciencesetavenir.fr/espace/rss.xml");

		// FUNCTION TO TRANSFORM XML TO JSON
		const jsonifyDatas = (source) => xml2js.parseStringPromise(source.data, { explicitArray : false }).then(function (result) {
			return result;
		}).catch(function (err) { 
			res.json(err + "error while transform xml file to json");
		});

		// FILTER SCIENCE ET AVENIR DATAS FROM JSON FILE
		let scienceEtAvenirJSON = await jsonifyDatas(scienceEtAvenirRss);

		let scienceEtAvenirDatas = scienceEtAvenirJSON.rss.channel.item;

		let slicedScienceEtAvenir = scienceEtAvenirDatas.slice(indexNews, maxResults);

		slicedScienceEtAvenir.map(({ title, description, link, enclosure, pubDate }) => {
			let img = enclosure.$.url;
			let source = "Science et avenir";
			formatedResult.push({title, description, link, img, pubDate, source});
		});

		// FILTER ESA DATAS FROM JSON FILE
		let esaJSON = await jsonifyDatas(esaRss);

		let esaDatas = esaJSON.rss.channel.item;

		let slicedesa = esaDatas.slice(indexNews, maxResults);

		slicedesa.map(({ title, description, link, pubDate }) => {

			let regex = /(https?:\/\/.*\.(?:png|jpg))/g;
			let img;

			while ((array = regex.exec(description)) !== null) {
				img = array[0];
			}
			description = description.replace(/<\/?[^>]+(>|$)/g, "");
			let source = "ESA";
			formatedResult.push({title, description, link, img, pubDate, source});
		});

		// FILTER LE MONDE DATAS FROM JSON FILE
		let lemondeJSON = await jsonifyDatas(lemondeRss);

		let lemondeDatas = lemondeJSON.rss.channel.item;

		let slicedLemonde = lemondeDatas.slice(indexNews, maxResults);

		slicedLemonde.map(({ title, description, link, enclosure, pubDate }) => {
			let img = enclosure.$.url;
			let source = "Le Monde";
			formatedResult.push({title, description, link, img, pubDate, source});
		});

		// SENDING JSON WITH ALL COMPILED DATAS
		// res.json(formatedResult);
res.send(formatedResult);

	},

	getBySource: async(req, res) => {
		const source = req.params.source;
		const indexNews = req.params.indexNews;

		let sourceUrl = "";
		let response = "";

		if(!source) {
			res.status(404).json({error: "not found"});
		} else {

			if(source === "sciencesetavenir") {

				sourceUrl = "https://www.sciencesetavenir.fr/espace/rss.xml";

				let results = null;
				

				response = await axios(sourceUrl);

				xml2js.parseString(response.data, { explicitArray : false }, function (err, result) {

					results = result.rss.channel.item;
					let formatedResult = [];

					// MAP TO FILTER ELEMENTS REQUIRED FROM THE RECEIVED OBJECT
					results.map(({ title, description, link, enclosure, pubDate }) => {
						let img = enclosure.$.url;
						let source = "Science et avenir";
						formatedResult.push({title, description, link, img, pubDate, source});
					});

					let maxResults = parseInt(indexNews)+4;
					res.json(formatedResult.slice(indexNews, maxResults));
				});
			} else if (source === "esa") {
				sourceUrl = "https://www.esa.int/rssfeed/France";

				let results = null;

				response = await axios(sourceUrl);

				xml2js.parseString(response.data, { explicitArray : false }, function (err, result) {

					results = result.rss.channel.item;
					let formatedResult = [];

					// MAP TO FILTER ELEMENTS REQUIRED FROM THE RECEIVED OBJECT
					results.map(({ title, description, link, pubDate }) => {

						let regex = /(https?:\/\/.*\.(?:png|jpg))/g;
						let img;

						while ((array = regex.exec(description)) !== null) {
							img = array[0];
						}
						let source = "ESA";
						formatedResult.push({title, description, link, img, pubDate, source});
					});

					let maxResults = parseInt(indexNews)+4;

					res.json(formatedResult.slice(indexNews, maxResults));
				});
			} else if (source === "lemonde") {
				sourceUrl = "https://www.lemonde.fr/espace/rss_full.xml";

				let results = null;

				response = await axios(sourceUrl);

				xml2js.parseString(response.data, { explicitArray : false }, function (err, result) {

					results = result.rss.channel.item;
					let formatedResult = [];

					let finalArray = [];

					// Rename the key media:content to media to be able to map on it
					// tuto : https://jetrockets.pro/blog/rmvzzosmz9-rename-the-key-name-in-the-javascript-object
					const renameKey = (object, key, newKey) => {

						const clonedObj = clone(object);
                      
						const targetKey = clonedObj[key];

						delete clonedObj[key];
                      
						clonedObj[newKey] = targetKey;
                      
						return clonedObj; 
					};

					const clone = (obj) => Object.assign({}, obj);
					for(const result of results) {
						formatedResult.push(renameKey(result, "media:content", "media"));

						formatedResult.map(({ title, description, link, media, pubDate }) => {
							let img = media.$.url;
							let source = "Le Monde";
							finalArray.push({title, description, link, img, pubDate, source});
						});
					}

					let maxResults = parseInt(indexNews)+4;

					res.json(formatedResult.slice(indexNews, maxResults));
				});
			}



		}
	},


};

module.exports = handleQuizController;