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

		let token = jwt.sign({
		  		board: req.session.board, 
		  		class : req.session.class,
		  		iat : (+ new Date())/1000,
		  		exp : ((+ new Date())/1000) + 604800,
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

module.exports = router;