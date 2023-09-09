const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const dirname = require("path");
const {fileURLToPath, meta} = require("url");
const mongoose = require("mongoose");
require("dotenv").config();

const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const mongodb_password = process.env.mongodb_password;

// const dir_name = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;
const io = new Server(server);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://kottedheeraj:"+ mongodb_password + "@cluster0.kugvsrx.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser:true});

const dataSchema = new mongoose.Schema({
    name:String
})

const Data = mongoose.model("Database", dataSchema);

const data = new Data({
    name:"hello"
})

data.save();

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.get("/", (req, res) => {
    console.log(__dirname);
    res.send("<h1>Hello World</h1>")
});

server.listen(port, () => {
    console.log("server running on port 3000");
});