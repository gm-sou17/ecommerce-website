
const userModel = require("../../../models/userModel")

async function allUsers ( req,res){

    try{


         console.log(" user id" ,req.userId)

         const  allUser = await userModel.find()

         res.json({
            message : "All user datails",
            data : allUser ,
            success : true ,
            error : false
         })
        


    }catch(err){

          res.status(200).json({

            message : err.message ,
            error : true ,
            success : false ,
            
        })
    }


}

module.exports = allUsers ;