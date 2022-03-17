var express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const router = require('./router/route.js')

const app=express();
app.use(express.json())


app.use('/',router);


app.listen(3000, ()=>{
    console.log('server listening on port 3000');

})