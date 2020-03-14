const express = require('express');
const router = express.Router();
const { dbinst } = require('../config/index.config');
const { encModel } = require('../models/index.model');

router.get('/search', async function(req, res, next) {

	let skey = req.body.search;

	if( skey ) {

		let param = {};
		param.skey = skey;

	} else {
		res.json({
			status: false,
			msg: 'Keyword cannot be blank'
		})
	}

	return res.end();
})

module.exports = router;