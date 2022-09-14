const net = require("net")

let sockets = []

const server = net.createServer(socket => {
    sockets.push(socket)
    console.log("Client connected");

    socket.on('data',(data) => {
        broadcast(data,socket)
    })

    socket.on('error',(error) => {
        console.log("A Client has disconnected from groupchat");
        console.error(error.message);
    })

    socket.on('close',() => {
        console.log("A Cleient has left the groupchat");
    })

    server.listen(8081,() => console.log("Server is listnening on port " + server.address().port) )
})