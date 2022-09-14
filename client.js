
const net = require("net")
const rl = require("readline")
const prompt = require("prompt-sync")()
const readline = rl.createInterface({
    input:process.stdin,
    output:process.stdout
})

let name

//let PORT = 8080
let HOST

let serverName
let userName 
let setPort = false

// bonus from the task but change setPort to true and start groupchatserver.js 
       //then you start a groupchat between clients

async function setServerAndUserName(){

    console.log("\n press enter if you like to be anonymous");
        userName = await prompt("whats your name? ")
        console.log(`Your name is set to ${ userName === "" ? "anonymous" : userName} `);
 
        console.log("witch host do you whant to connect to? ");
        console.log("Host names:\n java \n javaScript \n localhost \n groupchat");
        serverName =  await prompt()
    for(;;){
        if(serverName === 'java')  break
       else if(serverName === "javaScript" )  break
       else if(serverName === "localhost")  break
       else {
        console.log("Please enter valid host name ")
        console.log("Host names java \n javaScript \n localhost");
        serverName = await prompt("witch host do you whant to connect to? ")
       }

    }
    name = ""? "anonymous": userName
    HOST = serverName
    
}

setServerAndUserName()

const client = net.createConnection({
    port:setPort ? 5000 : 8080
},
(error) =>{
    if(error){
        console.log("faild to connect to server");
        console.error(error.message);
    }
   //let the server know the name of the client
   client.write(`${name === "" ? "CLIENTS name is anonymous\n ":"CLIENTS name is " + name}\n`)

    console.log(`${name === "" ? "anonymous": name}: connected to ${serverName} server`);
})

//get data from server change color on the text to yellow
client.on('data',(data) =>{
    console.log('\x1b[33m%s\x1b[0m',data.toString());
})

client.on('connect', () => {
    client.write(`${name} has joind the chat`)
})
//this is when someone leve the groupchat
client.on('timeout',() => {
    client.write('exit')
    client.end()
})

//log that client has disconnected from server
client.on('end',() => {
    console.log(`you diconnected from the server`);
})

    readline.on('line',(input) => {
        if(input === "end"){
            client.end()
            readline.close()
            //this is when someone leve the groupchat
        }else if(input ==="exit"){
            client.write(`${name} has left the groupchat`)
            client.setTimeout(1000)
        }
        else{
        client.write(`${name === "" ? "anonymous": name}: ${input}`)
    }
    })




