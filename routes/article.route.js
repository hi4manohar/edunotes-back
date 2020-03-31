const express = require('express');
const router = express.Router();
const { dbinst } = require('../config/index.config');
const { articleModel } = require('../models/index.model');

router.get('/', async function(req, res, next) {

	let articleObj = new articleModel({dbinst});

	let param = {};
	param.page = req.query.page ? (req.query.page) * 20 : 0;
	param.offset = 20;

	try {
		let articleData = await articleObj.getArticleList(param);
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