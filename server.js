const express = require("express");
const cors = require("cors");
const responseTime = require('response-time')
const path = require("path");
const cookieParser = require("cookie-parser");
const connection = require('./database/index')
const expressLayouts = require("express-ejs-layouts");
const app = express()



// Middleware
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "*" }));
app.use(responseTime())
connection()



// Rest API
app.use('/', require('./page/index'))
app.use('/api/user', require('./router/userRouter'))
app.use('/api/file', require('./router/fileRouter'))
// MongoDb tutorials
app.use('/aggregate', require('./router/aggregateRouter'))
app.use('/query', require('./router/queryRouter'))
app.use('/test', require('./router/test'))


app.listen(5000, () => {
    console.log('Server is running');
});