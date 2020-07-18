const express = require("express")
const app = express()
const port = 1234
const mongoose = require("mongoose")

// hpTrDOPgqpw2rZ09
mongoose.connect("mongodb+srv://laclass:laclass11213@cluster0.qdfum.mongodb.net/root?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true

})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongoDB")
})

mongoose.connection.on("error",(err)=>{
    console.log("error: ",err)
})
app.use(express.json())


app.listen(port,()=>{
    console.log("connecting to port: ",port)
})