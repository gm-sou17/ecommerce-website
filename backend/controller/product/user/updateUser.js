const  userModel = require("../../../models/userModel")


async function updateUser(req,res){

    try{

        const sessionUser = req.userId 

        const {userId,email,name,role} = req.body 
        const payload = {
            ...(email && {email : email}),
            ...(name && {email : name}),
            ...(role && {role : role})
        }

        const user  = await userModel.findById(sessionUser)

        const updateUser = await userModel.findByIdAndUpdate(userId,payload)

        console.log(" user role" ,user.role)

        res.json({
            data : updateUser ,
            message : "user updated",
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

    module.exports = updateUser