const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const port = 8000;
const mongoDB = require('../database/config.json');
var mongo = mongoDB.mongoURI;
const mongoose = require('mongoose');


const WEB_URL = "http://localhost:3001"

app.use(cors({credentials: true, origin: WEB_URL}));
app.use(express.json()); 

app.use(session({
    secret              : 'Collab-E-Learning-Platform',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000,
  }));

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 100,
}

mongoose.connect(mongo, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log("MongoDB connection failed: " + err);
    } else {
        console.log("MongoDB Connected!");
    }
})

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', WEB_URL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

const userRouter = require('../routers/userRouter');
app.use('/', userRouter);



const server = app.listen(port, () => console.log("Listening on port " + port));

