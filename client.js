
const net = require("net")
const rl = require("readline")
const prompt = require("prompt-sync")()
const readline = rl.createInterface({
    input:process.stdin,
    output:process.stdout
})

let name
let setPort
let HOST

let serverName
let userName 



console.log("\n There is a bonus group chat, but you need to start groupchatserver.js for this to work" )
console.log("otherwise just press enter or whatever except 'yes' if you want to get to the task \n");
console.log("you need to start server.js for the task to work\n");

// I couldn't get it to work if I tried to set the port in a async function therefore is the first to come up
  setPort =  prompt("do you whant to join a groupchat with other user? write: yes")

// make the client write there name and what address they whant to connect to before client connect to server 
async function setAddressAndUserName(){

    console.log("\n press enter if you like to be anonymous");
        userName = await prompt("whats your name? ")
        
        console.log(`Your name is set to ${ userName === "" ? "anonymous" : userName}`);

        console.log("Host names:\n java \n javaScript \n localhost \n groupchat");
        serverName =  await prompt("witch host do you whant to connect to? ")

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

setAddressAndUserName().catch(error  => {
    console.log("Something whent wrong when register a user");
    console.error(error.message);
})




const client = net.createConnection({
    port:setPort === "yes" ? 5000 : 8080
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




