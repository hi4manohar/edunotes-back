const express = require('express');
const router = express.Router();
const { dbinst } = require('../config/index.config');
const { classModel } = require('../models/index.model');

router.get('/sendpushnotification', function(req, res) {
	var admin = require("firebase-admin");
	
	var payload = {
		"data": {
			"title": "Class 10 Science Quiz Ready",
			"body": "Test yourself with class 10 science quiz",
			"notId": "12",
			"surveyID": "ewtawgreg-gragrag-rgarhthgbad",
			"to": '/content/quizzes?listype=grid',
			'image': 'https://www.fresherscode.com/edunotes-admin/wp-content/uploads/2020/04/study-1.jpg'
		},
		topic: 'android'
	};

	var serviceAccount = require("../config/edunotes-cloud-message-firebase-adminsdk-v4isv-815d31504a.json");

	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://edunotes-cloud-message.firebaseio.com"
	});

	admin.messaging().send(payload)
		.then(function (response) {
			console.log("Successfully sent message:", response);

			res.end();
			
		})
		.catch(function (error) {
			console.log("Error sending message:", error);
			res.end();
		});
})

router.get('/getwelcome', async function(req, res, next) {

	res.status(200).json({
		status: true,
		data: [
			{ src: 'uploads/static/images/slider/slider1.png',
				title: 'Prepare Effectively', 
				subtitle: `Studying at ease everywhere, 
					We keep you moving by having every board books in Your smartphone.` },
			{ src: 'uploads/static/images/slider/slider2.png',
				title: 'Self Learning Material',
				subtitle: `Easy and meaningful content help you to understand topic at your pace` },
			{ src: 'uploads/static/images/slider/slider3.png',
				title: 'Quick Reference App',
				subtitle: `We help you to quick find explanation about any topic at our digital platform` }
		]
	});

	res.end();
})

router.get('/app_details', async function(req, res, next) {

	res.status(200).json({
		status: true,
		data: {
			published_app_version: '1.0.7',
			maintanance_mode: false
		}
	});
	return res.end();
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