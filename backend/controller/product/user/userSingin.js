const bcript = require("bcryptjs") ;
const userModel  = require("../../../models/userModel")
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){

    try{

        const {email ,password} = req.body 


        if(!email){
            throw new Error(" please provide email") ;
        }
        if(!password){
            throw new Error(" please provide password") ;
        }

        const user = await userModel.findOne({email}) ;

        if(!user){
            throw new Error("user not found") ;
        }

        const checkPassword =  bcript.compareSync(password,user.password) ;

        console.log("checkPassword",checkPassword) ;

        if(checkPassword){

            const tokenData = {

                _id :user._id ,
                email :user.email

            }
          const token =   await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
           const tokenOptione = {
             httpOnly : true ,
                         secure : process.env.NODE_ENV === "production",
                         sameSite : "lax"
           }
          res.cookie("token",token,tokenOptione).status(200).json({
            message :"user login successfully",
            data : token ,
            success :true ,
            error :false
          })

        }else{
            throw new Error("please check your password");
        }

    }

    catch(err){
         res.json({
            message :err.message ,
            error :true,
            success :false ,
        })
    }
    
}


module.exports = userSignInController ;