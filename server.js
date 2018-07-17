const express = require('express')
const app = express();
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session');


const authRouter = require('./routes/auth-routes')
const authProfile = require('./routes/auth-profile')

const passportSetup = require('./config/passport-setup');
const mongokeys = require('./config/keys');


app.set('view engine','ejs')

app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: ['asmmorshed']
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(mongokeys.dbrul,function(){
	console.log("Connected with online db")
})
app.use('/auth',authRouter)
app.use('/profile',authProfile)

app.get('/',(req,res)=>{
	console.log('Hello form google auth')
	res.render('index')

})

app.listen(3000, ()=>{
	console.log('server is working on port 3000')

})
