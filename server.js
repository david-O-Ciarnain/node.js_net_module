const net = require("net")
const rl = require("readline")
const prompt = require("prompt-sync")
const connectedClients = []


const readline = rl.createInterface({
    input:process.stdin,
    output:process.stdout
})

const PORT = 8080

const HOST = 'localhost'
const server = net.createServer()

server.on('connection',(socket) => {
    console.log("new Client connected to server\n");
    
    connectedClients.push(socket)
    
    console.log("number of clients connected " + connectedClients.length);

    //show that client has left the server
    socket.once('close',() => {
        console.log('One client left the server')
        connectedClients.pop()
        console.log("number of clients connected " + connectedClients.length);
    })

    
    socket.on('error',(error) => {
       
        console.error(` ERROR ON SERVER: ${error.message}`);

            if(error.message === "read ECONNRESET"){
                console.log("Client abruptly closed connection to server");
            }
    })

    //get address and port info from client 
   console.log(`client address ${socket.remoteAddress}, client port ${socket.remotePort}\n`);
   
   //Client iformation when connect to server
    socket.write(`SERVER: Welcome  to best chatroom on the web, you are now connected\n`)
    socket.write("SERVER: You can now chat with other users\n")
    socket.write("SERVER: write 'end' to exit server")

    //server can send messages to alla clients
    readline.on('line',(input) => {
        socket.write(`SERVER: ${input}`)
    })


    socket.on('data',(data) => {
        //convert client data to string from bites
  
        console.log('\x1b[33m%s\x1b[0m',data.toString());
        
    })
})


server.on('error',(error) => {
    // checks if port is occupied
    if(error.code === "EADDRINUSE"){
        console.log("this Port is in use PORT:" + PORT + ", retrying to connecte...");
    }
    setTimeout(() =>{
        //close server and try connect again after 3 seconds
        server.close()
        server.listen(PORT,HOST)
    },3000)
})

server.listen(PORT,() => console.log("listen on port %j", server.address().port))

