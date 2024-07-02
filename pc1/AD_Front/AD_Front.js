const express = require('express');
const fs = require('fs');
const http = require('http');
const app = express();
const PORT = process.argv[2] || 8443;


app.use(express.static('Public'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
    res.header("Access-Control-Allow-Headers", "content-type");
    console.log("Request recibida!\n\tmetodo: "+ req.method + "\n\turl:" + req.url + "\n\tbody:" + JSON.stringify(req.body) + "\n\tIP: " + req.ip);
    next();
});

http.createServer(app).listen(PORT, () => {
    console.log('Servidor API para el front lanzado en ' + PORT);
});

