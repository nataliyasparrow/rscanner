const { Receipt } = require('../Models/models');
const recognizer = require('./brf_recognizer');

module.exports = {
    listOfWords: function(recognitionResults) {
        console.log("Hi from listOfWords function")
        var allWords = [];
        for(let l of recognitionResults[0].lines){
            for(let w of l.words){
                allWords.push(w);
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
        console.log("Hi from listOfLines function")
        oneLine = []
        allLines = []
        lineHeight = Math.abs(listOfWords[0].boundingBox[5] - listOfWords[0].boundingBox[3]);
        prev = listOfWords[0].boundingBox[3];
      
        for(let w of listOfWords){
            if(Math.abs(w.boundingBox[3] - prev) < lineHeight){
                oneLine.push(w)
            }
            else{
                oneLine.sort(function(a,b){return a.boundingBox[0] - b.boundingBox[0]})
                allLines.push(oneLine);
                // console.log("***New line***")
                // console.log(oneLine)
                oneLine = []
                lineHeight = Math.abs(w.boundingBox[5] - w.boundingBox[3]);
                prev = w.boundingBox[3];
            }
        }
        // console.log("List of Lines")
        // console.log(allLines)  
        return allLines  
    },
    // listOfStrings(listOfLines){
    //     // console.log(listOfLines);
    //     allStrings = [];
    //     oneString = [];
    //     for(let l of listOfLines){
    //         // console.log("*****Next line**********")
    //         for(let w of l){
    //             // console.log("One word: ", w.text);
    //             oneString.push(w.text);
    //             // console.log("String: ", oneString)
    //         }
    //         // console.log("One string: ", oneString)
    //         allStrings.push(oneString);
    //         oneString = [];
    //     }
    //     return allStrings;
    //     // console.log("All strings: ", allStrings)
    // },
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
        console.log("Hello from Store name function")
        max = 0;
        nameLine = listOfLines[0];
        // console.log(`Initial name: ${nameLine}`)
        name = "";
        lineHeight = Math.abs(listOfLines[0][0].boundingBox[5] - listOfLines[0][0].boundingBox[3]);
        for(let l of listOfLines){
            // console.log("First el from every line from list of lines")
            // console.log(l[0])
            if(l[0]!=undefined){ 
                lineHeight = Math.abs(l[0].boundingBox[5] - l[0].boundingBox[3]);
                if(lineHeight > max){
                // console.log(`Line: ${l[0].text}`)
                
                        max = lineHeight;
                        // console.log(`Max is ${max}`)
                        nameLine = l;
                        // console.log(`Name is ${nameLine}`);
                    
                }
            }
        }
        for(let w of nameLine){
            // name = name + w.text + " ";
            // console.log(`Words in name`, w.text)
            if (w.text){
                name = name + w.text + " ";
            }
        }
        console.log("Store name", name)
        return name;
    }

}