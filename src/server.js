const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const morgan = require('morgan');
const configviewengine = require('./config/viewengine')
const webrouter = require('./routes/web')
const connection = require('./config/database')
const cors = require('cors')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('combined'));
configviewengine(app)
app.use('/', webrouter)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})