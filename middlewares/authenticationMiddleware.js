require("dotenv").config()
const jwt = require("jsonwebtoken")
const { pushRefreshToken,checkRefreshToken,deleteToken } = require("../schema/tokens")



const generateAccessToken = (user) => jwt.sign(user, process.env.USER_AUTH_ACCESS_PRIVATE_KEEY,{expiresIn:'1500s'})
const generateRefreshToken = (user) => jwt.sign(user, process.env.USER_AUTH_REFRESH_PRIVATE_KEEY)


exports.validateSignUpReqParams = (req, res, next) => {
    if (!(req.body.userName && req.body.password)) {
        return res.sendStatus("400")
    }
    next()
}

exports.validateSignInReqParams = (req, res, next) => {
    if (!(req.body.userName && req.body.password)) {
        return res.sendStatus("400")
    }
    next()
}

exports.generateJWT =  (req, res, next) => {
    const refresh_token = generateRefreshToken(req.user)
    try {
        pushRefreshToken(refresh_token)
    } catch (e) {
        console.log(e)
        return res.sendStatus("500")
    }    
    req.tokens = {
        access_token : generateAccessToken(req.user),
        refresh_token : refresh_token
    }
    next()
}

exports.authenticateAccessToken = (req, res, next) => {
    if (!req.headers.access_token) {
        res.sendStatus("401")
    }
    jwt.verify(req.headers.access_token, process.env.USER_AUTH_ACCESS_PRIVATE_KEEY, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus("403")
        req.user = user
        next()
    })
}

exports.getAceesTokenFromRefreshToken =async (req,res,next) => {
    if(!req.body.refresh_token){
        return res.sendStatus("401")
    }
    await jwt.verify(req.body.refresh_token, process.env.USER_AUTH_REFRESH_PRIVATE_KEEY, async (err, user) => {
        console.log(err)
        if (err) return res.sendStatus("403")
        if(await checkRefreshToken(req.body.refresh_token)){
            req.access_token = generateAccessToken(user)
            next()
        }else{
            return res.sendStatus("401")
        }
        next()
    })
}

exports.signOut = async (req,res,next) => {
    if(! req.body.refresh_token){
        return res.sendStatus("401")
    }
    try{
        await deleteToken(req.body.refresh_token)
    }catch(e){
        return res.sendStatus("500")
    }
    return res.json({
        success : true,
        message : `SignedOutSuccessfully`    
    })
    next()
}