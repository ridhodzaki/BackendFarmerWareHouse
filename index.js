const http = require("http");
require("dotenv").config();
require("./config/Database").connect();
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const path = require("path");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// cors
app.use(cors())
app.use(express.json({
  extended: true,
  limit: '20mb'
}))
app.use(express.urlencoded({
  extended: true,
  limit: '20mb'
}))

// path
const directory = path.join(__dirname, '/image/')
app.use('/image', express.static(directory))

// list routes
app.use('/user', require('./routes/User'))
app.use('/barang', require('./routes/Barang'))
app.use('/kategori', require('./routes/Kategori'))

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});