const { Receipt } = require('../Models/models');
const controller = require('./controller');
const brf_parser = require('./brf_parser');

// const router = require('../Routes/routes');
const fs = require('fs');
const request = require('request');

let subscriptionKey = process.env['COMPUTER_VISION_SUBSCRIPTION_KEY'];
let endpoint = process.env['COMPUTER_VISION_ENDPOINT']
if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }

var uriBase = endpoint + 'vision/v2.0/read/core/asyncBatchAnalyze';

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
            if (!error && response.statusCode == 202) {
                console.log("Success")
                // console.log(response.headers['operation-location'])
                const optionsGet = {
                    uri: response.headers['operation-location'],
                    headers: {
                        'Ocp-Apim-Subscription-Key': subscriptionKey
                    }
                }
                
                function onResult(error, response, body){
                    console.log("Success again")
                    result = JSON.parse(body)
                    if(result.status == "Running"){
                        console.log("Sending again")
                        setTimeout(() => {
                        request.get(optionsGet, onResult)}, 1000);
                        return;
                    }
                    // console.log(result)
                    if(result.status == "Succeeded"){
                        console.log("status is Succeeded")
                        var words = brf_parser.listOfWords(result.recognitionResults);
                        var lines = brf_parser.listOfLines(words);
                        var store = brf_parser.storeName(lines);
                        var items = brf_parser.listOfItems(lines);
                        Receipt.create({
                            'service': "BRF",
                            'store': store,
                            'items': items,
                            'image': "",
                            // 'jsonResult': JSON.stringify(body),
                            })
                            .then(data => {
                                console.log("new receipt in DB has been created");
                                // res.json({ message: "success", results: data});
                                // res.json(JSON.parse(body))
                                // res.json(data)
                                res.json(data)
                                // console.log("server success", data);
                            })
                            .catch(err => {
                                console.log("Error!!!", err);
                                res.json(err)
                                // res.json(JSON.parse(body));
                                // res.json({ message: "error", results: err });
                                // console.log("server error", data);
                            })
                    }
                    // res.json(JSON.parse(body))                
                }
                request.get(optionsGet, onResult)
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