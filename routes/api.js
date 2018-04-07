const express = require('express');
const Stock = require('../models/stock');
const quandlAPI = require('../api/quandl');

const router = express.Router();

router.get('/stocks', (req, res, next) => {
    const { ticker } = req.query;
    const { createDate } = req.query;
    Stock.findOne({ ticker, createDate }).then((stock) => {
        if ((stock && stock.length !== 0)) { res.send(stock); } 
        else {
            quandlAPI(ticker)
                .then((data) => {
                    const mData = new Stock(data);
                    mData
                        .save()
                        .then(() => { res.send(data); })
                        .catch(() => { throw new Error('Failed saving in database') });
                })
            .catch(next);
        }
    });
});

router.post('/stocks', (req, res, next) => {
    // after Stock.create completes function with stock fires up
    Stock.create(req.body)
        .then((stock) => {
            res.send(stock);
        })
        .catch(next);
});

router.put('/stocks/:id', (req, res) => {
    Stock.findByIdAndUpdate({
        _id: req.param.id
    }).then(() => {
        // for updated stock
        Stock.findOne({
            _id: req.param.id
        }).then((stock) => {
            res.send(stock);
        });
    });
});

router.delete('/stocks/:id', (req, res) => {
    // console.log(req.params.id);
    Stock.findByIdAndRemove({
        _id: req.param.id
    }).then((stock) => {
        res.send(stock);
    });
});

module.exports = router;