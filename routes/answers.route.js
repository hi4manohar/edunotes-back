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
    param.tags = req.query.tags ? req.query.tags.trim() : false;

    try {
        let answersData = await answersObj.getAnswersList(param);
        let getAnswerTags = false;
        if(param.page === 0) {
            getAnswerTags = await answersObj.getTagsofAnswers(param);
        }
        res.json({
            status: true,
            data: answersData.data,
            tags: (getAnswerTags && getAnswerTags.data.length > 0 ) ? getAnswerTags.data : []
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