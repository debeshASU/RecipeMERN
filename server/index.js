const express = require("express");
require('dotenv').config();
const dbConnection = require("./database/dbConnection.js");
dbConnection();
const app = express();
const cors = require('cors');

const route = require("./Routes/userRoute.js");
const router = require("./Routes/receipeRoute.js");
app.use(express.json());
app.use(cors());
app.use( "/users", route );
app.use("/receipe",router);

app.listen(process.env.DB_PORT,()=>
{
   console.log(`Server started at ${process.env.DB_PORT}`);
});