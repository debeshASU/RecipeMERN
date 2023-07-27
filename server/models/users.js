const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username : String,
    password : String,
    savedReceipes : [{ type : mongoose.Schema.Types.ObjectId , ref : "receipes" }]

});

module.exports= mongoose.model("User", userSchema);