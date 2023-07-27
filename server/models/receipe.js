const mongoose = require('mongoose');

const receipeSchema = new mongoose.Schema({

    name : String,
    instructions : String,
    image_url : String,
    cooking_duration : Number,
    user_owner : { type :mongoose.Schema.Types.ObjectId, ref : "users"}

});

module.exports = mongoose.model("Receipe",receipeSchema);