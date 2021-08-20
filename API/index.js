const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./Routes/user.js")
const authRoute = require("./Routes/auth.js")
dotenv.config()
app.listen("5000",()=>
{
    console.log("Backend running")
})
app.use(express.json())
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},()=>{
    console.log("DATABASE CONNECTED")
});

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
