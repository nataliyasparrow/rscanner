const { Receipt } = require('../Models/models');
const controller = require('./controller');
const parser = require('./parser');

// const router = require('../Routes/routes');
const fs = require('fs');
const request = require('request');

let subscriptionKey = process.env['COMPUTER_VISION_SUBSCRIPTION_KEY'];
let endpoint = process.env['COMPUTER_VISION_ENDPOINT']
if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }

var uriBase = endpoint + 'vision/v2.1/ocr';

//  const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/' +
//     'Atomist_quote_from_Democritus.png/338px-Atomist_quote_from_Democritus.png';
// var imageFile = 'r1.jpg';

// let imageData = fs.readFileSync(imageFile);
var imageData = fs.readFileSync('./static/images/r1.jpg');

// console.log("Image data", imageData);

// Request parameters.
const params = {
    'language': 'unk',
    'detectOrientation': 'true',
};

const options = {
    uri: uriBase,
    qs: params,
    // body: '{"url": ' + '"' + imageUrl + '"}',
    body: imageData,
    headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': subscriptionKey
    }
};


module.exports = {
    Recognize: (req, res) => {
        console.log('Sending...')
        request.post(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                // console.log("Data", JSON.parse(body))
                // console.log("Language: ", JSON.parse(body).language); 
                var words = parser.listOfWords(JSON.parse(body).regions);
                // console.log("All words: ", words);
                var lines = parser.listOfLines(words);
                var store = parser.storeName(lines);
                var items = parser.listOfItems(lines);
                // parser.listOfStrings(lines);
                // console.log("Results: ", JSON.stringify(body))
                Receipt.create({
                        'service': "OCR",
                    'store': store,
                    'items': items ,
                    'image': "",
                    // 'jsonResult': JSON.stringify(body),
                    })
                    .then(data => {
                        console.log("new receipt in DB has been created");
                        // res.json({ message: "success", results: data});
                        // res.json(JSON.parse(body))
                        res.json(data)
                        // console.log("server success", data);
                    })
                    .catch(err => {
                        console.log("Error!!!", err);
                        res.json(JSON.parse(body));
                        // res.json({ message: "error", results: err });
                        // console.log("server error", data);
                    })
                        // res.json(JSON.parse(body))
            }
        })
        console.log('Sent')
    }
}


// controller.createReceipt({
//     store: "New",
//     image: options.body,
//     jsonResult: JSON.parse(body)
// });

// Parser(){  
    
// }