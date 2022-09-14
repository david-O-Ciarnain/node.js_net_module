const net = require("net")

let sockets = []

const server = net.createServer()

server.on('connection',socket => {

    sockets.push(socket)
    console.log("Client connected");

    socket.on('data',(data) => {
        broadcast(data.toString(),socket)
    })

    socket.on('error',(error) => {
        console.log("A Client has disconnected from groupchat")
        console.error(error.message);
    })

    socket.on('close',() => {
        console.log("A Cleient has left the groupchat")
        
    })

    socket.write("Welcome to the groupchat!! \n write 'exit' to leve groupchat \n you can now send messages to other pepole that is connected to the groupchat")


})

function broadcast(message,socketSent){
    //check how in sockets array whant to exit groupchat
    if(message === "exit"){
        let userIndex = sockets.indexOf(socketSent)
        sockets.splice(userIndex,1)
    }else{
        //send message to all sockets in array except the message sender 
        sockets.forEach(socket =>{
            if(socket !== socketSent)
            socket.write(message)})
    }
}
server.listen(5000,() => console.log("Server is listnening on port " + server.address().port) )