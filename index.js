const express = require("express");
const app = express()
const port = 3000
const router = require('./router');
const mongoose = require('mongoose');
const uri = "mongodb+srv://mongo-colin:p4ssword@cluster0.ywlkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.json());
app.use(router);

app.get('/test', (req,res) => res.send("This is a test!"));


mongoose.connect(uri);
app.listen(port, () =>
    console.log(`Example app listening on http://localhost:${port}`)
)

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function callback() {
    console.log("Database Connected");
})