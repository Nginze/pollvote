const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
const authRoute = require('./routes/AuthRoute.js')
const userRoute = require('./routes/UserRoute.js')
const pollRoute = require('./routes/PollRoute')
const MongoStore = require('connect-mongo')
const { Cookie } = require('express-session')
require('dotenv').config()
require('./authservice/AuthConfig.js')
const connection = mongoose.connect('mongodb+srv://Jonathan:guuk12jona@cluster0.vnne0.mongodb.net/Polls', { useNewUrlParser: true,  useUnifiedTopology: true  },(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('connected to Database')
    }
})
//Middleware
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({

    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: 'mongodb+srv://Jonathan:guuk12jona@cluster0.vnne0.mongodb.net/Polls'}),
    cookie: {maxAge: 180 * 60 * 1000}
  
}))
app.use(passport.initialize())
app.use(passport.session())

//Api Routes
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/polls', pollRoute)

app.get('/', (req,res) => {
    res.send(req.isAuthenticated())
})
app.listen(process.env.PORT, () => {
    console.log('listening .... ' + process.env.PORT)
})