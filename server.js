const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();

mongoose.connect('mongodb://localhost/receiptScannerDB', { useNewUrlParser: true });
app.use(express.static(__dirname+'/public/dist/public'));
app.use(express.static(__dirname+'/static/images'));


app.use(express.urlencoded({extended: true}));
app.use(express.json());

require('./Server/Routes/routes')(app);

app.listen(8000, () => {
    console.log("Listening on port 8000");
})