const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.use('/', (req, res) => {
    res.send('Hello World!');
})
app.use('/leco', require('./routes/LecoRoutes'));


// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

module.exports = serverless(app);
