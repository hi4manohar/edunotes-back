const express = require('express');
const router = express.Router();
const { dbinst } = require('../config/index.config');
const { booksModel } = require('../models/index.model');

router.get('/', async function(req, res, next) {

	let booksObj = new booksModel({dbinst});
	let param = {};
	param.class = req.appBaseConfig.class;
	param.board = req.appBaseConfig.board;

	try {
		let booksData = await booksObj.getBooksList(param);

		if( booksData.data.length > 0 ) {

			res.status(200).json({
				status: true,
				data: booksData.data
			})
		} else {
			res.status(200).json({
				status: false,
				msg: 'No Content Found'
			})
		}
	} catch(err) {
		res.status(204).json({
			status: false,
			data: err.msg
		});
	}
	return res.end();
});

router.get('/:bookid', async function(req, res, next) {

	let param = {};
	if( req.params.bookid ) {
		param.bookid = req.params.bookid.trim();

		let booksObj = new booksModel({dbinst});

		try {
			let booksData = await booksObj.getBookDetails(param);
			
			res.status(200).json({
				status: true,
				data: booksData.data
			})
		} catch(err) {
			res.status(204).json({
				status: false,
				msg: err.msg
			});
		}
	} else {
		res.status(400).json({
			status: false,
			msg: 'No Book Id Provided'
		})
	}	
	return res.end();
});

module.exports = router;