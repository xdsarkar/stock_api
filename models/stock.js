const mongoose = require('mongoose');

const { Schema } = mongoose;

const StockSchema = new Schema({
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    ticker: {
        type: String,
        requred: true
    },
    priceHistory: Schema.Types.Mixed
});

const Stock = mongoose.model('stock', StockSchema);

module.exports = Stock;