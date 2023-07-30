const fs = require("fs");
const express = require("express");
const cors =  require('cors');
const path = require("path");
const dirPath = path.join(__dirname,"Files")

const app = express();
app.use(cors());

//console.log(__dirname);
//console.log(dirPath);
app.get('/timestamp', function (req, res) {
    let date = new Date();
    //console.log(date, typeof(date));
    let t = date.toTimeString();
    let d = date.toDateString();
    d = d.split(" ");
    d = d[1]+d[2]+d[3];
    t = t.split(" ");
    t = t[0];
    t = t.replaceAll(":","");
    let filename = d +"-"+ t;
    const content = date.toLocaleString();

  //  fs.writeFileSync("./current-date-time.txt", timest, (err)=> {
    fs.writeFileSync(`${dirPath}/${filename}.txt`, content, (err)=> {
        if(err){
           return res.send({message: 'error writing timestamp'});
        }
    })
    res.send({message: 'recoreded timestamp!',
    timestamp: content});
// res.sendFile(path.join(dirPath, "current-date-time.txt"))
})

// endpoint to get a particular file from folder by giving timestamp
app.get('/timestamp/:ts', function (req, res) {
    const {ts} = req.params;
    let file = ts+".txt";
    try{
        res.sendFile(path.join(dirPath,file));
    }
    catch(err){
        res.send({msg:err});
    }

})
//listen and start a http server in specific port 
app.listen(9000, ()=> console.log("starting server at port 9000"))

