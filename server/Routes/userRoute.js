const express = require("express");
const User = require("../models/users.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const VerifyToken = require('../middleware/verifyToken.js');

const route = express.Router();

route.post("/register", async (req,res) =>
{
  const {username,password} = req.body;
  if(!username || !password)
  {
    res.json({message : "Fields cannot be empty!!!"});
    return;
  }
   try{
    const user = await User.findOne({username});
    if(user)
    {
        res.json({message : "Username already exists...!!!"});
        return;
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const createUser = await User.create({username,password:hashedPassword});
    console.log(createUser);
    res.json({message : "Successfully Registered!!!"});
   }
   catch(err)
   {
     console.log(err);
   }
});

route.post("/login", async (req,res) =>
{
  
   try{

     const {username,password} = req.body;
     if( !username || !password )
     {
     res.status(400).json({message :"Fields cannot be empty"});
     return;
     }
    const user = await User.findOne({username});
    console.log(user);
    if(!user)
    {
      res.status(404).json({message :"User not found"});
      return;
        
    }
    const checkPassword = await bcrypt.compare(password,user.password);
    if( !checkPassword )
    {
      res.status(401).json({message :"Invalid Credentials!!!"});
      return;
    }
    const token = await jwt.sign( {user_id : user._id}, process.env.JWT_SECRET_CODE);
    res.json({token , id : user._id });

   }
   catch(err)
   {
     res.status(500).json({message:"internal server error!!!"});
   }
});

route.get("/", async (req,res) =>
{
   try{
    const getUser = await User.find();
    res.json(getUser);
   }
   catch(err)
   {
     console.log(err);
   }
});


module.exports= route ;

