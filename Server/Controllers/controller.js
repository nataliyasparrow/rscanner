const { Receipt } = require('../Models/models');

module.exports = {
    allReceipts: (req,res) => {
        Receipt.find().sort('type')
            .then(data => {
                res.json({ message: "success", results: data});
            })
            .catch(err => {
                res.json({ message: "error", results: err });
            })
    },
    oneReceipt: (req,res) => {
        Receipt.findOne({_id: req.params.id})
            .then(data => {
                res.json({ message: "success", results: data });

            })
            .catch(err => {
                res.json({ message: "error", results: err });
            })
    },
    createReceipt: (req,res) => {
        // console.log("createPet server req body", req.body);
        Receipt.create(req.body)
            .then(data => {
                res.json({ message: "success", results: data});
                // console.log("server success", data);
            })
            .catch(err => {
                res.json({ message: "error", results: err });
                // console.log("server error", data);
            })
    },
    
    updateReceipt: (req, res) => {
        // console.log("updatePet server req body", req.body);
        Receipt.findOneAndUpdate({_id: req.params.id}, req.body, { runValidators: true , new: true})
        // Pet.findOneAndUpdate({_id: req.params.id}, req.body, { new: true})
            .then(data => 
                res.json({message: "success", results: data}))
            .catch(err => 
                res.json({message: "error", results: err}));


    },

    deleteReceipt: (req,res) => {
        Receipt.findOneAndDelete({_id: req.params.id})
            .then(data => {
                res.json({ message: "success", results: data});

            })
            .catch(err => {
                res.json({ message: "error", results: err });
            })
    },

}