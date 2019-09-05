const express = require('express');
const path = require('path');
// const Rx = require('rxjs');
// const Operators = require('rxjs/operators');
// Rx.of(123).subscribe
require('./app');
const port = process.env.PORT || 9999;
const app = express();
const appLoader = require('./loader');
// serve static assets normally
// app.use(express.static(__dirname + '/dist')); 
appLoader.IndexView;
// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
// app.get('*', function (request, response) {
//     response.sendFile(path.resolve(__dirname, 'index.html'));
// });
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.get('/login', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public/login/login.html'));
});
app.get('/home', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public/dashboard/home/home.html'));
});
app.get('/list-flat', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public/dashboard/flats/list-flat/list-flat.html'));
});
app.get('/reflect', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public/dashboard/reflects/list-reflect/list-reflect.html'));
});

// app.get('/login', function (req, res) {
//     res.sendFile(path.resolve(__dirname, 'login.html'));
// });
app.listen(port);
console.log("server started on port " + port);