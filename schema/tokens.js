const momgoose = require("mongoose")
const { Schema } = momgoose

momgoose.connect(process.env.DATABASE_URL)

const RefeshTokens = momgoose.model('RefeshTokens', new Schema({
    token: {
        type: String,
        required: true
    }
})
)

exports.pushRefreshToken = async (token) => {
    try {
        const newToken = new RefeshTokens({
            token: token
        })
        await newToken.save()
        return true
    } catch (e) {
        return false
    }
}

exports.checkRefreshToken = async (token) => {
    try{
        const findToken = await RefeshTokens.findOne({
            token: token
        })
        if(findToken === null)  return false
        return true
    }catch(e){
        console.log(e)
        return false
    }
}

exports.deleteToken = async (token) => {
    await RefeshTokens.findOneAndDelete({
        token : token
    })
}