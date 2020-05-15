const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/config', function(req, res, next) {

	console.log('body', req.query);

	let param = {};
	param.board = req.query.board;
	param.class = req.query.class;

	if( param.board && param.class ) {

		req.session.board = param.board.trim();
		req.session.class = param.class.trim();

		//valid for 90 days
		let token = jwt.sign({
		  		board: req.session.board, 
		  		class : req.session.class,
		  		iat : (+ new Date())/1000,
		  		exp : ((+ new Date())/1000) + 7776000,
		  		// exp : ((+ new Date())/1000) + 10
		  	},
		  	'manohar@rtf',
		);

		res.json({
			status: true,
			data: token
		})

	} else {
		res.json({
			status: false,
			msg: 'Invalid Details'
		})
	}

	return res.end();
})

router.get('/validate', function(req, res, next) {

	res.json({
		session: res.session,
		body: req.body,
		headers: req.headers
	})
})

module.exports = router;