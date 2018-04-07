##  NodeJS + Express + MongoDB + Quandl API

- Tested with:
  - **Operating System**: Ubuntu 17.10, codename: artful
  - **node -v**: v6.11.4
  - **mongod --version**: db version v3.6.3

JSON extracted from url: `https://www.quandl.com/api/${apiVersion}/datasets/${publisher}/${ticker}.json?api_key=${quandlToken}`
* **apiVersion**: v3
* **publisher**: NSE
* **ticker**: TCS, WIPRO, INFY, AAPL, etc.

### Run MongoDB:
* ```sudo service mongod start```
* ```mongo --host 127.0.0.1:27017```

### Follow the following steps:
1. `npm install` will install all modules listed as dependencies in **package.json** in the local **node_modules** folder
2. `nodeman index.js` or `node index.js`
3. Use Web Browser/ Postman to check **RESTful HTTP Requests** `/GET`, `/POST`, `/PUT` and `/DELETE`
4. From Browser:
* http://localhost:4000/api/stocks?ticker=TCS (/GET)
* If ticker is not available, it is created
5. Similarly, other requests can be checked


> Note: Improvements are on their way
