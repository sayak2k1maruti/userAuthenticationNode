const express = require("express")
require("dotenv").config()

const {  saveToUsers, validateUser  } = require("../schema/users")

const {
    validateSignInReqParams,
    validateSignUpReqParams,
    generateJWT,
    authenticateAccessToken,
    getAceesTokenFromRefreshToken,
    signOut
} = require("../middlewares/authenticationMiddleware")

const router = express.Router()
const saltRounds = 10


router.get("/test",authenticateAccessToken, (req, res) => {
    res.json({
        success : true,
        you : req.user,
        message : `Your Auth_Token is verified`
    })
})


router.post("/signUp", validateSignUpReqParams, saveToUsers,generateJWT,(req, res) => {
    res.json({
        success : true,
        access_token : req.tokens.access_token,
        refresh_token : req.tokens.refresh_token
    })
})

router.post("/signIn", validateSignInReqParams,validateUser,generateJWT,(req, res) => {
    res.json({
        success : true,
        access_token : req.tokens.access_token,
        refresh_token : req.tokens.refresh_token
    })
})

router.post("/getAccess",getAceesTokenFromRefreshToken,(req,res) => {
    res.json({access_token : req.access_token})
})
module.exports = router


router.post("/signOut",signOut)
