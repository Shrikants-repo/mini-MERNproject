const mongoose = require('mongoose');
const express = require('express');
const app = express();


const DB = "/* put your mongodb connection*/"
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(()=>{
    console.log("connection to mongodb done")
}).catch((err)=>{
    console.log("no connection")
});


//const User = require('./model/userSchema');
app.use(express.json());
app.use(require('./router/auth'));
app.use(express.json());


const middleware = (req,res, next) => {
    console.log(`Hello my Middleware`);
    next();
}

 app.get('/', (req, res) => {
     res.send(`Hello world from the server app.js`);
 });

app.get('/about', middleware, (req, res) => {
    console.log(`Hello my About`);
    res.send(`Hello About world from the server`);
});

app.get('/contact', (req, res) => {
    res.send(`Hello Contact world from the server`);
});

app.get('/signin', (req, res) => {
    res.send(`Hello Login world from the server`);
});

app.get('/signup', (req, res) => {
    res.send(`Hello Registration world from the server`);
});

app.listen(5000, () => {
    console.log(`server is runnig at port no 5000`);
})

