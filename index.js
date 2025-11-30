const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/leco', require('./routes/LecoRoutes'));

module.exports = app;
module.exports.handler = serverless(app);

// app.listen(3001, '127.0.0.1', ()=>{
//     console.log("Server is connected!")
// })
