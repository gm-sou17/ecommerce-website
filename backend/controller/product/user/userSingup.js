const userModel = require("../../../models/userModel")

const bcrypt = require('bcryptjs')




async function userSingUpController( req,res) {

    try{

    
        const{email,password,name} = req.body 

        const user = await userModel.findOne({email})

        if(user){
            throw new Error("user already exist")
        }


        console.log("req.body",req.body)

        if(!email){

            throw new Error("please provide email")

        }
        if(!password){

            throw new Error("please provide password")

        }
        if(!name){

            throw new Error("please provide name")

        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword =  bcrypt.hashSync(password, salt);


      

        if(!hashPassword){

            throw new Error("password not hashed")
        }

          const payload = {

            ...req.body,
            role : "GENERAL",
            password : hashPassword
          }
        

        const userData = new userModel( payload
            
            //{
            // email,
            // password,
            // name,  }
            )  // data hai  uska shema  hai 

            const saveData = await userData.save()

            res.status(201).json({
                data: saveData ,
                success :true ,
                erorr :false ,
                message : " User create Successfully"
           })


    } catch(err){

        res.json({
            message :err.message ,
            erorr :true,
            success :false ,
        })
    }
    
}


module.exports = userSingUpController 