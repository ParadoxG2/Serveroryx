////////////////////////////////////////
// Serveroryx             BY:Landon M //
////////////////////////////////////////

//Dependinceys
const fs = require('fs');
const term = require('terminal-kit').terminal;
const express = require('express');
const app = express();

    //[GLOBAL VARS]//
var log_path = null;
var date = null;
    //[EXPRESS STARTUP]//
term.clear();
Serveroryx_Config("./src/Logs/", null);
INIT_Servonex(3000, "pages/Login_Template/index.html");

    //[CONFIGURATION SETUP]//
function Serveroryx_Config(LogfilePath, overrideDate)
{
    if(!LogfilePath) return;
    log_path = LogfilePath;

    if(!overrideDate) return;
    date = overrideDate;
}

    //[SERVERORYX INIT]//
function INIT_Servonex(port, DIR)
{
    //get curent time this means you have to either restart the server evry day or re call the initialization function evry copol of hours the last option might mess up the server
    const today = new Date(); 
    const day = today.getDate(); 
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();
    date = "[" + month + '-' + day + '-' + year + "]";

    //do the express things
    app.listen(port);
        //Lisen for client connections and send page
    var StartingMesege = "Server starting on port: " + port;
    Log("bg", "*", StartingMesege)
    app.get('/', function (req, res) {
        res.sendFile(DIR, {root: __dirname })
    });
}

    //[LOG MESSEGE]//
function Log(type, action, message)
{
//check for null inputs if so dont do anything
    if(!type) return;
    if(!message) return;
    if(!type && !message) return;
    
    if(type == "warn"){
        term.yellow("[" + action + "]  " + message + "\n");
    } else if(type == "error"){
        term.red("[" + action + "]  " + message + "\n");
    } else if(type == "log"){
        term.blue("[" + action + "]  " + message + "\n");
    } else if(type == "bg"){
        term.bgWhite(" "+action+" ");
        term.bgBlue(message);
        term("\n");
    } else {
        console.log("[" + action + "] " + message + "\n");
    }
//log to file

//Check if file alredy existes 
    const path = log_path + date + ".txt"; //file path with todayes date added
    
// then edit the file with the new info
    var content = date + "[" + action + "]  " + message;
    content += "\n";
    fs.appendFile(path, content, (err) => {
    });   
}

    //[RECIVED CONTENT]//

setInterval(Recived, 10);
// let this be caled as an update function and return the data that whas sent to the server
function Recived()
{
   
}