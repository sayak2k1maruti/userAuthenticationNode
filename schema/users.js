const momgoose = require("mongoose")
const {Schema} = momgoose
const bcrypt = require('bcrypt')
const saltRounds = 10

momgoose.connect(process.env.DATABASE_URL)


const Users = momgoose.model('Users',new Schema({
    userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    registeredAt : {
        type  : Date,
        required : true,
        default : Date.now()
    }
})
)

exports.saveToUsers = async (req,res,next) => {
    const doesUserExists = await Users.findOne({userName : req.body.userName})
    if(doesUserExists !== null){
        return res.json({
            success : false,
            error : "Username already exists Please Retry with unique one"
        })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    const newUser = new Users({
        userName : req.body.userName,
        password : hashedPassword
    })
    try{
        await newUser.save()
        
        //Send it to next middleware
        req.user = {
            _id : newUser._id,
            userName : newUser.userName
        }
        next()
    }catch(e){
        console.log(e)
        return res.sendStatus("500")
    }
    next()
}

exports.validateUser = async (req,res,next) => {
    try{
        const findUser = await Users.findOne({
            userName : req.body.userName
        })
        if(findUser === null){
            return res.json({
                success : false,
                error : `Username Not found`
            })
        }
        const result = await bcrypt.compare(req.body.password,findUser.password)
        if(result){

            //Send this user to next middleWare
            req.user = {
                _id : findUser._id,
                userName : findUser.userName
            }
            next()
        }else{
            return res.json({
                success : false,
                error : `Username/Password Not Matched`
            })
        }
    }catch(e){
        console.log(e)
        return res.sendStatus("500")
    }
    next()
}

exports.Users = Users