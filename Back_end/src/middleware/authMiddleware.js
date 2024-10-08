
const jwt= require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config()
const authMiddleware = (req, res, next)=>{
    console.log('check token::: ', req.headers.token)
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err){
            return res.status(404).json({
                message: 'The authemtication',
                status: 'Err'
            })
        }
        console.log("Decoded user payload::::", user);
        console.log("Check payload:::: ", user.payload.isAdmin)
        if(user.payload.isAdmin){
      
            next()
        }
        else{
            return res.status(404).json({
                message: 'The authemtication',
                status: 'Looix ccc gi the'
            })
        }

      });
}
module.exports={
    authMiddleware
}