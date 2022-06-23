const express = require('expresss');
const app = express()
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const { session_collection, session_secret, database, exprire } = require('./config');

const store = new MongoDBSession({
    uri: database,
    collection: session_collection,
});
app.use(
    session({
        secret: session_secret,
        saveUninitialized: false,
        store: store,
        resave: false,
        cookie: {
            httpOnly: true, 
            maxAge: exprire, 
            sameSite: "strict",
        },
    })
);
