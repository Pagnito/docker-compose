const express = require('express');
const app = express();
const router = require('./router')
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.options('*', cors());

app.use('/cars', router);

app.listen(4000, () => {
    console.log('LISTENING ON PORT 4000')
});