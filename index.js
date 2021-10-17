const express = require("express")
const authenticationServer = require("./routes/authenticationServer")
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.use('/users',authenticationServer)



app.listen(port,()=>{
    console.log(`Application running at PORT : ${port}`)
})