var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const users=require('../api-cfg/routes/user')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


const stores = require('./routes/store')
const cfg = require('./routes/cfg')


app.get('/users', users.getUsers)
app.get('/users/:id', users.getUserById)
app.post('/users', users.createUser)
app.post('/login', users.getLogin)




app.put('/users/:id', users.updateUser)
app.delete('/users/:id', users.deleteUser)
//cfg
app.get('/cfg', cfg.getCfg)
app.get('/cfg/:id', cfg.getCfgById)

app.get('/stores', stores.getStores)

module.exports = app;
