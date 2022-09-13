const net = require("net")
const rl = require("readline")

const readline = rl.createInterface({
    input:process.stdin,
    output:process.stdout
})

const PORT = 8080
const HOST = 'localhost'
const server = net.createServer()

server.on('connection',(socket) => {
    console.log("new Client connected to server\n");

    //show that client has left the server
    socket.once('close',() => console.log('close client connection'))

    //error handling on coonection
    socket.on('error',(error) => {
        console.log("Error connecting to server");
        console.error(error.message);
    })

    //get address and port info from client 
   console.log(`client address ${socket.remoteAddress}, client port ${socket.remotePort}`);

    socket.write("SERVER: Welcome to best chatroom on the web, you are now connected<br>")
    readline.on('line',(input) => {
        socket.write(`SERVER: ${input}`)
    })
    socket.on('data',(data) => {
        console.log(data);
        //convert client data to string from bites
        console.log(data.toString());
    })
})
server.on('error',(error) => {
    // checks if port is occupied
    if(error.code === "EADDRINUSE"){
        console.log("this Port is in use PORT:" + PORT + ", retrying to connected...");
    }
    setTimeout(() =>{
        //close server and try connect again after 3 seconds
        server.close()
        server.listen(PORT,HOST)
    },3000)
})

server.listen(PORT,() => console.log("listen on port %j", server.address().port))

