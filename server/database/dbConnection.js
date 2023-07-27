const mongoose = require("mongoose");

const dbConnection = async () =>
{
    try
    {
        const Connect = await mongoose.connect(process.env.DB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully Connected To The Database...!!!");
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = dbConnection ;

