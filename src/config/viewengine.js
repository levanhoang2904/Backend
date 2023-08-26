const path = require('path');
const express = require('express');
var bodyparser = require('body-parser')


const configviewengine = (app)=>{

app.set('views engine', 'ejs')
app.set('views', path.join('./src', './views')),
app.use(express.static(path.join('./src', './public')));

}

module.exports= configviewengine;