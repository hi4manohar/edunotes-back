const express = require('express');
const router = express.Router();
const { dbinst } = require('../config/index.config');
const { classModel } = require('../models/index.model');

router.get('/getwelcome', async function(req, res, next) {

	res.status(200).json({
		status: true,
		data: [
			{ src: 'uploads/static/images/slider/slider1.png' },
			{ src: 'uploads/static/images/slider/slider2.png' },
			{ src: 'uploads/static/images/slider/slider3.png' }
		]
	});

	res.end();
})

router.get('/getboardlist', async function(req, res, next) {

	let classObj = new classModel({dbinst});

	try {
		let boardData = await classObj.getboardlist();

		console.log(boardData);

		if( boardData.data.length > 0 ) {

			res.status(200).json({
				status: true,
				data: boardData.data
			});
		} else {
			res.status(204).json({
				status: false,
				msg: 'No Content Available'
			})
		}
	} catch(err) {
		console.log(err);
		res.status(204).json({
			status: false,
			msg: err.msg
		});
	}
	res.end();
})

router.get('/getclasslist', async function(req, res, next) {

	let classObj = new classModel({dbinst});

	try {
		let classData = await classObj.getclasslist();

		if( classData.data.length > 0 ) {

			res.status(200).json({
				status: true,
				data: classData.data
			});

			console.log('completed');
		} else {
			res.status(204).json({
				status: false,
				msg: 'No Content Available'
			})
		}
	} catch(err) {
		console.log(err);
		res.status(204).json({
			status: false,
			msg: err.msg
		});
	}
	res.end();
})

module.exports = router;