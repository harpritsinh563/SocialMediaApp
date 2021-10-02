const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./Routes/user.js")
const authRoute = require("./Routes/auth.js")
const postRoute = require("./Routes/post.js")
const conversationRoute = require("./Routes/conversation.js")
const messageRoute = require("./Routes/message.js")


const commentRoute = require("./Routes/comment.js")
const multer = require("multer")
const path = require("path")

app.use(express.json())
app.use("/Images",express.static(path.join(__dirname,"/Images")))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname+"/Images")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.fname);
  }
})

const upload = multer({ storage: storage })
app.post("/api/uploads", upload.single("file"), (req, res) => {
  res.status(200).json("file Uploaded")
});

dotenv.config()
app.listen("5000", () => {
  console.log("Backend running")
})
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, () => {
  console.log("DATABASE CONNECTED")
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);

