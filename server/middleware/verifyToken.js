const jwt = require('jsonwebtoken');
const VerifyToken = (req,res,next) =>
{
   try{

    const token = req.headers.authorization;
    jwt.verify( token ,process.env.JWT_SECRET_CODE );
    next();

   }
   catch(err)
   {
      res.status(400).json({message : "Not Authorized to access...!!!"});
   }
}

module.exports = VerifyToken;