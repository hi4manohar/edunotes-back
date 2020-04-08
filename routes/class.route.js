const express = require('express');
const router = express.Router();
const { dbinst } = require('../config/index.config');
const { classModel } = require('../models/index.model');

//get list of all the subjects
router.get('/get', async function(req, res, next) {

	let classObj = new classModel({dbinst});

	try {
		let classData = await classObj.getSubjectList();
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
	return res.end();
})

//get list of all the chapters of that particular subject
router.get('/get/:subjectname', async function(req, res, next) {

	let classObj = new classModel({dbinst});
	let param = {};
	param.subjectname = req.params.subjectname;
	param.class = req.appBaseConfig.class;
	param.board = req.appBaseConfig.board;

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

//get posts of a particular chapter
router.get('/get/chapters/:chaptername', async function(req, res, next) {

	let param = {};
	param.chaptername = req.params.chaptername;

	if( !param.chaptername ) {
		res.status(400).json({
			status: false,
			msg: 'ChapterName is Required'
		})
		return res.end();
	}
	let classObj = new classModel({dbinst});

	if( param.chaptername ) {

		try {
		let articleData = await classObj.getArticleByChapter(param);
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
		res.status(204).json({
			status: false,
			msg: 'Chaptername is required'
		})
	}
	res.end();
})

module.exports = router;