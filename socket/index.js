const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
});

let users = [];

const addUser = (userId,socketId) =>{
    !users.some((user)=> user.userId === userId) && users.push({userId,socketId})
}

const removeUser = (socketId) =>{
    users = users.filter((user)=> user.socketId !== socketId)
}

const getUser =(userId)=>{
    // console.log("User id : "+userId)
    console.log("Users"+users)
    return users.find((user)=>user.userId === userId)
}


io.on('connection', (socket) => {
// connection establish
    console.log('a user connected');

// messager opened
    socket.on("addUser",userId=>{
        console.log("INSIDE ADDUSER")
        addUser(userId,socket.id)
        console.log(users)
        io.emit("getUser",users)
    })
    
//send message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user = getUser(receiverId);
        console.log("user : "+user)
        console.log("receiver id : "+receiverId)
        io.to(user.socketId).emit("getMessage",{
            senderId,
            text,
        })
    })


    socket.on("disconnect",()=>{
        console.log(" a user Disconnected");
        removeUser(socket.id)
        io.emit("getUser",users)
    })
});
  
