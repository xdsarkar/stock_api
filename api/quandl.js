const rp = require('request-promise');

const quandlToken = 'MX4zkypoSjUzp8CyotQg';
const apiVersion = 'v3';
const publisher = 'NSE';

const apiUrl = ticker => `https://www.quandl.com/api/${apiVersion}/datasets/${publisher}/${ticker}.json?api_key=${quandlToken}`;

const dataArrayLevels = {
  Date: 0,
  Open: 1,
  High: 2,
  Low: 3,
  Last: 4,
  Close: 5,
  'Total Trade Quantity': 6,
  'Turnover (Lacs)': 7
};

const processQuandlResponse = (data) => {
  const tempData = JSON.parse(data);
  const priceHistory = {};
  tempData.dataset.data.forEach((priceArray) => {
    priceHistory[priceArray[dataArrayLevels.Date]] = {
      Open: priceArray[dataArrayLevels.Open],
      Close: priceArray[dataArrayLevels.Close],
      High: priceArray[dataArrayLevels.High],
      Low: priceArray[dataArrayLevels.Low]
    };
  });
  const response = {
    ticker: tempData.dataset.dataset_code,
    priceHistory
  };
  return response;
};

const apiRequest = ticker =>
  rp(apiUrl(ticker))
    .then(response => processQuandlResponse(response))
    .catch(error => error);

module.exports = apiRequest;