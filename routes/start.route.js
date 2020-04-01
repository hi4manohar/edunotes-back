const express = require('express');
const router = express.Router();
const { dbinst } = require('../config/index.config');
const { classModel } = require('../models/index.model');

router.get('/getwelcome', async function(req, res, next) {

	res.status(200).json({
		status: true,
		data: [
			{ src: 'uploads/static/images/slider1.jpg' },
			{ src: 'uploads/static/images/slider1.jpg' },
			{ src: 'uploads/static/images/slider1.jpg' }
		]
	});

	res.end();
})

router.get('/getboardlist', async function(req, res, next) {

	let classObj = new classModel({dbinst});

	try {
		let boardData = await classObj.getboardlist();

		console.log(boardData.data.length);

		if( boardData.data.length > 0 ) {

			res.status(200).json({
				status: true,
				data: boardData.data
			});
		} else {
			console.log('hello');
			res.status(204).json({
				status: false,
				msg: 'No Content Available'
			})
		}
	} catch(err) {
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