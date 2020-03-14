const express = require('express');
const router = express.Router();
const { dbinst } = require('../config/index.config');
const { articleModel } = require('../models/index.model');

router.get('/', async function(req, res, next) {

	let articleObj = new articleModel({dbinst});

	try {
		let articleData = await articleObj.getArticleList();
		res.json({
			status: true,
			data: articleData.data
		});
	} catch(err) {
		res.json({
			status: false,
			data: err
		});		
	}
	res.end();
})

module.exports = router;