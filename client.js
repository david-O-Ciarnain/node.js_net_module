
const net = require("net")
const rl = require("readline")
const prompt = require("prompt-sync")()
const readline = rl.createInterface({
    input:process.stdin,
    output:process.stdout
})

let name

let PORT = 8080
let HOST

let serverName
let userName 

async function setServerAndUserName(){
 
        console.log("witch host do you whant to connect to? ");
        console.log("Host names:\n java \n javaScript \n localhost \n groupchat");
        serverName =  await prompt()
    for(;;){
        if(serverName === 'java') break
       else if(serverName === "javaScript" ) break
       else if(serverName === "localhost") break
       else if(serverName === "groupchat"){
        console.log("Enter groupchat");
        PORT = 8081
        break
       }
       else {
        console.log("Please enter valid host name ")
        console.log("Host names java \n javaScript \n localhost");
        serverName = await prompt("witch host do you whant to connect to? ")
       }

    }
    console.log(" press enter if you like to be anonymous\n");
        userName =  prompt("whats your name? ")
        console.log(`Your name is set to ${ userName === "" ? "anonymous" : userName} `);
    
    
    name = ""? "anonymous": userName
   
    
    HOST = serverName
   
}

setServerAndUserName()

const client = net.createConnection({
    port:PORT
},
(error) =>{
    if(error){
        console.log("faild to connect to server");
        console.error(error.message);
    }
   //let the server know the name of the client
   client.write(`${name === "" ? "CLIENTS name is anonymous":"CLIENTS name is " + name}`)

    console.log(`${name === "" ? "anonymous": name}: connected to ${serverName} chatroom`);
})

//get data from server
client.on('data',(data) =>{
    console.log(data.toString());
    
 
})

//log that client has disconnected from server
client.on('end',() => {
    console.log(`you diconnected from the server`);
})

    readline.on('line',(input) => {
        if(input === "end"){
            client.end()
            readline.close()
        }
       else if(name === undefined && input !== "end"){
            //information to the client
            console.log(client.remoteAddress);
        }
        else{
        client.write(`${name === "" ? "anonymous": name}: ${input}`)
    }
    })




