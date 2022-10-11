const express = require('express');

const app = express();


app.get('/', (req, res) => {
	res.send("<h2>Hi there !!!!</h2>")
})

const port = process.env.PORT || 3000;
console.log("🚀 ~ file: index.js ~ line 11 ~ process.env.PORT", process.env.PORT)
app.listen(port, () => console.log('listening on http://localhost:'+ port));