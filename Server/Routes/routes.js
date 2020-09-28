const controller = require('../Controllers/controller');
const recognizer = require('../Controllers/recognizer');
const brf_recognizer = require('../Controllers/brf_recognizer');

const path = require('path');

module.exports = app => {
    app.get('/api/recognizer', recognizer.Recognize);
    app.get('/api/brf_recognizer', brf_recognizer.Recognize);
    app.get('/api/receipts', controller.allReceipts);
    app.get('/api/receipts', controller.allReceipts);
    app.get('/api/receipts/:id', controller.oneReceipt);
    app.post('/api/receipts', controller.createReceipt);
    app.put('/api/receipts/:id', controller.updateReceipt);
    app.delete('/api/receipts/:id', controller.deleteReceipt);
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    });
}