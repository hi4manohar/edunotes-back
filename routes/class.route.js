const express = require('express');
const router = express.Router();
const { dbinst } = require('../config/index.config');
const { classModel } = require('../models/index.model');

router.get('/get', async function(req, res, next) {

	let classObj = new classModel({dbinst});

	try {
		let classData = await classObj.getClassList();
		res.status(200).json({
			status: true,
			data: classData.data
		});
	} catch(err) {
		res.status(204).json({
			status: false,
			msg: err.msg
		});
	}
	res.end();
})

router.get('/get/:subjectname', async function(req, res, next) {

	let classObj = new classModel({dbinst});
	let param = {};
	param.subjectname = req.params.subjectname;

	if( param.subjectname ) {

		try {
		let articleData = await classObj.getArticleBySubject(param);
			res.status(200).json({
				status: true,
				data: articleData.data
			});
		} catch(err) {
			res.status(204).json({
				status: false,
				msg: err.msg
			});
		}
	} else {
		res.status(406).json({
			status: false,
			msg: 'Classname is required'
		})
	}
	res.end();
})

module.exports = router;