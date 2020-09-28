const { Receipt } = require('../Models/models');
const recognizer = require('./recognizer');

module.exports = {
    listOfWords: function(receiptData) {
        var allWords = [];
        var oneWord = { boundingBox: [Number], text: String };
        for(let r of receiptData)
        {
            // console.log("-----Region-------");
            for(let l of r.lines){
                // oneWord = {};
                // console.log("***Line***");
                for(let w of l.words){
                    oneWord = {};
                    // console.log(w.text);
                    // var numericList = Array.from(w.boundingBox.split(',')).map(item => Number(item));
                    oneWord.text = w.text;
                    // console.log("text: ", oneWord.text)
                    oneWord.boundingBox = Array.from(w.boundingBox.split(',')).map(item => Number(item));
                    // allWords.push(w.boundingBox);
                    // console.log(oneWord);
                    allWords.push(oneWord);
                }
            }
        }
        // console.log("Before sorting: " + allWords[0].text + " ; " + allWords[1].text)
        allWords.sort(function(a,b){return a.boundingBox[1] - b.boundingBox[1]})
        // console.log("---All words---");
        // console.log(allWords);
        // console.log("After sorting: " + allWords[0].text + " ; " + allWords[1].text)
        // for(let w of allWords){
        //     console.log(w.boundingBox);
        // }
        return allWords;
    },
    listOfLines(listOfWords){
        allLines = [];
        oneLine = [];
        prev_y = listOfWords[0].boundingBox[1];
        for(let w of listOfWords){
            if(Math.abs(w.boundingBox[1] - prev_y) < w.boundingBox[3]*0.5){
                oneLine.push(w);
            }
            else{
                oneLine.sort(function(a,b){return a.boundingBox[0] - b.boundingBox[0]})
                allLines.push(oneLine);
                // console.log(`Diff: ${Math.abs(w.boundingBox[1] - prev_y)}; heigth: ${w.boundingBox[3]} `)
                // console.log("Line: ", oneLine);
                oneLine = [];
            }
            prev_y = w.boundingBox[1];
        }
        // console.log("All lines: ", allLines);
        return allLines;
    },
    listOfStrings(listOfLines){
        // console.log(listOfLines);
        allStrings = [];
        oneString = [];
        for(let l of listOfLines){
            // console.log("*****Next line**********")
            for(let w of l){
                // console.log("One word: ", w.text);
                oneString.push(w.text);
                // console.log("String: ", oneString)
            }
            // console.log("One string: ", oneString)
            allStrings.push(oneString);
            oneString = [];
        }
        return allStrings;
        // console.log("All strings: ", allStrings)
    },
    listOfItems(listOfLines){
        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
          }          
        allItems = [];
        item = {name: "", price: 0}
        for(let l of listOfLines){
            for(let w of l){
                if(!isNaN(w.text) && (/^\d+(\.\d+)?$/.test(w.text))){
                    item.price =item.price + w.text;
                    console.log(`Price: ${item.price}`)
                }
                else
                    if(w.text && isNaN(w.text))
                    {
                        item.name = item.name + w.text + " ";
                    }
            }
            if(!isNaN(item.price) && isFinite(item.price) && /^\d+(\.\d+)?$/.test(item.price)){
                parseFloat(item.price)
                // console.log("Price: ", item.price)
            }
            if(item.name != "" && item.price != 0 && /^\d+(\.\d+)?$/.test(item.price)){
                allItems.push(item);
                }
            item = {name: "", price: 0}
        }
        // console.log(allItems);
        return allItems;
    },
    storeName(listOfLines){
        max = 0;
        nameLine = listOfLines[0];
        // console.log(`Initial name: ${nameLine}`)
        name = "";
        for(let l of listOfLines){
            if(l[0]!=undefined && l[0].boundingBox[3] > max){
            // console.log(`Line: ${l[0].text}`)
            
                    max = l[0].boundingBox[3];
                    // console.log(`Max is ${max}`)
                    nameLine.push(l);
                    // console.log(`Name is ${nameLine}`);
                
            }
        }
        for(let w of nameLine){
            // name = name + w.text + " ";
            // console.log(`Words in name`, w.text)
            if (w.text){
                name = name + w.text + " ";
            }
        }
        // console.log("Store name", name)
        return name;
    }

}