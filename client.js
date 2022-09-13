
const net = require("net")
const rl = require("readline")

const readline = rl.createInterface({
    input:process.stdin,
    output:process.stdout
})

let name
let PORT = 8080
const HOST = "localhost"

const client = net.createConnection({
    port:PORT
}, 
(error) =>{
    if(error){
        //save info in file
        console.log("faild to connect to server");
        console.error(error.message);
    }
    console.log("Client: connected to server");
})

//get data from server
client.on('data',(data) =>{
    console.log(data.toString());
   // client.end()
})


//log that client has disconnected from server
client.on('end',() => {
    console.log(`${name}: diconnect from server`);
})

    readline.on('line',(input) => {
        if(name === undefined){
            name = input
            console.log(`Your name is set to ${name} `);
            client.write(`${name === undefined ? "CLIENTS name is CLIENT":"CLIENTS name is " + input}`)

        }else{
        client.write(`${name === "" ? "CLIENT": name}: ${input}`)
    }
    })




