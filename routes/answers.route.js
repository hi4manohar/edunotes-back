const express = require('express');
const router = express.Router();
const { dbinst } = require('../config/index.config');
const { answersModel } = require('../models/index.model');

router.get('/list', async function (req, res, next) {

    let answersObj = new answersModel({ dbinst });

    let param = {};
    param.class = req.appBaseConfig.class;
    param.board = req.appBaseConfig.board;
    param.page = req.query.page ? (req.query.page) * 20 : 0;
    param.offset = 20;

    try {
        let answersData = await answersObj.getAnswersList(param);

        res.json({
            status: true,
            data: answersData.data
        });
    } catch (err) {
        console.log(err);
        res.json({
            status: false,
            msg: 'Something went wrong. Kindly re-open app.'
        });
    }
    res.end();
})

module.exports = router;