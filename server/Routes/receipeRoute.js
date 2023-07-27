const express = require('express');
const router = express.Router();
const Receipe = require("../models/receipe.js");
const User = require("../models/users.js");
const VerifyToken = require('../middleware/verifyToken.js');
const mongoose = require('mongoose');

router.get("/:name", VerifyToken,  async (req,res) =>
{
    try{
        if(req.params.name !== "empty")
        {
        const listOfReceipes = await Receipe.find({ name: { $regex: req.params.name, $options: 'i' } });
        return res.json(listOfReceipes);
        }
        
        const listOfReceipes = await Receipe.find();
        return res.json(listOfReceipes);
    }
    catch(err)
    {
        res.json(err);
    }
});

// router.get("/", VerifyToken, async (req,res) =>
// {
//     try{
//          const getReceipes = await Receipe.find();
//          res.json(getReceipes);
//     }
//     catch(err)
//     {
//         res.json(err);
//     }

// } );

// router.get("/:id", async (req,res) =>
// {
//     try{
//         const saved = await Receipe.findOne({_id:req.params.id});
//         res.json(saved);
//    }
//    catch(err)
//    {
//        res.json(err);
//    }

// } );

router.get("/save/:id", VerifyToken,  async (req,res) =>
{
    try {
        const user = await User.findOne({ _id: req.params.id });
        const idList = user.savedReceipes;
        
        const promiseArray = idList.map(async (receipe_id) => {
          const receipe = await Receipe.findById(receipe_id);
          return receipe;
        });
        
        const listArray = await Promise.all(promiseArray);
        res.send(listArray);
      } 
      catch (err) {
        res.json(err);
      }
      

} );

router.post("/", VerifyToken, async (req,res) =>
{
    const{name,instructions,image_url,cooking_duration,user_owner} = req.body;
    if(!name||!instructions||!image_url||!cooking_duration)
    {
        res.json({message : "Fields cannot be empty!!!"});
    }
    try{
       const addReceipe = await Receipe.create({name,instructions,image_url,cooking_duration,user_owner}) ;
       res.json({message:"Receipe added!!!"});
    }
    catch(err)
    {
        res.json(err);
    }

} );

router.put("/save",  async (req,res) =>
{
    const{user_id,receipe_id} = req.body;
    try{
        console.log("user-id:",user_id);
        console.log("receipe id:",receipe_id);
        const user = await User.findById(user_id); 
        if( user.savedReceipes.includes(receipe_id)) 
        {
            res.status(400).json({message:"already saved..."});
            return;
        }
        console.log(user);
        await User.findOneAndUpdate(
            { _id: user_id }, 
            { $push: { savedReceipes: receipe_id } }
        );
        console.log(user);
        res.json({message:"saved..."});
        
    }
    catch(err)
    {
        res.status(500).json(err);
    }

} );

router.delete("/saved",  async (req,res) =>
{
    const{user_id, receipe_id} = req.body;
    try{
        console.log("receipe_id:",receipe_id);
        console.log("user_id:",user_id);
        const removedReceipe = await User.updateOne( { _id: user_id }, { $pull: { savedReceipes: { $eq: receipe_id } } });
        res.json("Successfully removed...!!!");
    }
    catch(err)
    {
        res.json(err);
    }
});





module.exports= router ;