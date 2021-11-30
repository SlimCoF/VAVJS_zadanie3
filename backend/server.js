const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const mysql = require('mysql');

let connectionMade = false;
let connection = null;
function connectDB() {
    if(connectionMade===false) {
        connection = mysql.createConnection({
            host     : 'mydb',
            user     : 'root',
            password : 'root',
            database : 'produkty'
        });
        connection.connect(err =>{
            if(!err) {
                connectionMade = true;
            }
        });
    }
}


app.get(['/', '/index.html'], (req,res)=>{
    console.log(req.method+ ' rquest /index.html');

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Access-Control-Allow-Origin','*');
    fs.readFile('static/index.html', 'utf-8', (err, data)=>{
        if(err){
            res.status(500).send('<html><body><h1>FS GET ERROR</h1></body></html>');
        }
        else{
            res.status(200).end(data);
        }
    });
});

app.get('/bundle.js', (req,res)=>{
    console.log(req.method+ ' rquest /bunlde.html');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');

    fs.readFile('static/bundle.js', 'utf-8', (err, data)=>{
        if(err){
            res.status(500).send('<html><body><h1>FS GET ERROR</h1></body></html>');
        }
        else{
            res.status(200).end(data);
        }
    });
});

app.get('/data', (req, res)=>{
    console.log(req.method+ ' rquest /data');
    connectDB();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    connection.query('SELECT * FROM tprodukty', function(error,results){
        if(error){
            res.set({
                'Content-Type': 'text/html'
            });
            res.status(500).send('<html><body><h1>DB GET ERROR</h1></body></html>');
        }
        res.set({
            'Content-Type': 'application/json'
        });
        console.log(results);
        res.status(200).json(results);
    });
});

app.options('/data', (req, res)=>{
    console.log(req.method+' options /data');

    res.statusCode = 200;
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.end();
})

app.post('/data', (req, res)=>{
    console.log(req.method+' receve /data');
    connectDB();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    req.on('data', function(data){
        let input = JSON.parse(data).input;
        connection.query('INSERT INTO tprodukty (nazov) VALUES(\''+ input +'\')', 
        function(error,results){
            if(error){
                // res.status(500).send('<html><body><h1>DB POST ERROR</h1></body></html>');
                res.statusCode = 500;
                res.end(JSON.stringify({'status': 'error'}));
            }
            // console.log(results);
            // res.status(200).json(results);
            res.end(JSON.stringify({'status': 'ok'}));
        });
    });
});

app.delete('/data', (req, res)=>{
    console.log(req.method+ ' delete /data');
    connectDB();

    req.on('data', function(data){
        console.log('data:' +data);
        let id = JSON.parse(data).id;
        console.log('id:' +id);
        res.setHeader('Content-Type', 'application/json');
        // res.setHeader('Access-Control-Allow-Origin','*');
        connection.query('DELETE FROM tprodukty WHERE id='+id+';', function(error,results){
            if(error){
                res.status(500).send(JSON.stringify({'status': 'error'}));
            }
            console.log('ending: ');
            console.log(res)
            res.status(200).end(JSON.stringify({'status': 'ok'}));
        });
    });
});

app.put('/data', (req, res)=>{
    console.log(req.method+ ' delete /data');
    connectDB();

    req.on('data', function(data){
        console.log('data:' +data);
        let id = JSON.parse(data).id;
        let newValue = JSON.parse(data).nazov;
        console.log('id:' +id, 'nazov:' +newValue);
        res.setHeader('Content-Type', 'application/json');
        // res.setHeader('Access-Control-Allow-Origin','*');
        connection.query('UPDATE tprodukty SET nazov=\''+newValue+'\' WHERE id='+id+';', function(error,results){
            if(error){
                res.status(500).send(JSON.stringify({'status': 'error'}));
            }
            console.log('ending: ');
            console.log(res)
            res.status(200).end(JSON.stringify({'status': 'ok'}));
        });
    });
});

app.listen(port, ()=>{
    console.log('Express server running v1');
});

// var ival = setInterval(()=>{
//     console.log('trying to connect to DB');
//     connection.connect((err)=>{
//         if(err){
//             console.error(err);
//             return;
//         }
//         clearInterval(ival);
//         console.log('DB connected');
//         app.listen(port, ()=>{
//             console.log('Express server running v1');
//         });
//     });
// }, 5000);