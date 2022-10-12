const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
mongoose
	// .connect("mongodb://root:example@172.22.0.2:27017/?authSource=admin")
	// .connect("mongodb://root:example@mongo:27017/?authSource=admin")
	.connect(mongoURL)
	.then(() => console.log("Successfully connected to MongoDB"))
	.catch(error => console.log(error))

app.get('/', (req, res) => {
	res.send("<h2>Hi there !!!!</h2>")
})

const port = process.env.PORT || 3000;
console.log("🚀 ~ file: index.js ~ line 11 ~ process.env.PORT", process.env.PORT)
app.listen(port, () => console.log('listening on http://localhost:'+ port));