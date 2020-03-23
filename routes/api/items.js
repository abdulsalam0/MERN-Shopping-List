const express = require('express');
const router = express.Router();

// item model
const Item = require("../../models/item");

//@route    GET api/items
//@desc     Get all items
//@access   public
router.get('/',(req,res)=>{
    Item.find()
    .sort({date:-1})
    .then(items => res.json(items));
});

//@route    POST api/items
//@desc     Create a new Item
//@access   public
router.post('/',(req,res)=>{
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

//@route    DELETE api/items
//@desc     Delete an item
//@access   public
router.delete('/:id',(req,res)=>{
    Item.findByIdAndDelete(req.params.id, (err, item) =>{

        // checks for err and replies with status code 500
        if(err) return res.status(500).send(err);

        // creates a response message
        const response = {
            message: "Item successfully deleted",
            id: item._id
        };
        
        // replies with status code 200
        return res.status(200).send(response);
    });
});

module.exports = router;