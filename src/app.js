const express = require('express');
const bodyParser = require('body-parser')
const http = require('http')
const cookieparser = require('cookie-parser')
const validator = require('express-validator')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
var flash = require('connect-flash');
const container = require('./container')


container.resolve(function (users) {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/socketiofool', { useUnifiedTopology: true, useNewUrlParser: true })
    const app = setupExpress()

    function setupExpress() {
        const app = express();
        const server = http.createServer(app)
        setupApp(app)
        server.listen(3000, () => {
            console.log('App listening on port 3000!');
        });
        const router = require("express-promise-router")();
        users.setRouter(router);
        app.use(router)
    }


    function setupApp(app) {
        require('./passport/local-passport')
        app.set(express.static('public'))
        app.use(cookieparser())
        app.set('view engine', 'ejs')
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        // app.use(validator())
        app.use(session({
            secret: 'sdfsdfas',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({
                mongooseConnection: mongoose.connection
            })
        }))
        app.use(flash())
    }

})

