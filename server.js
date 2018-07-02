// server.js

// set up ======================================================================
// get all the tools we need
const express  = require('express')
const app      = express()
const port     = process.env.PORT || 8080
const mongoose = require('mongoose')
const passport = require('passport')
const flash    = require('connect-flash')
const Web3 = require('web3')
const truffleContract = require('truffle-contract')


const morgan       = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser   = require('body-parser')
const session      = require('express-session')

const configDB = require('./config/database.js')

// configuration ===============================================================
mongoose.connect(configDB.url) // connect to our database

require('./config/passport')(passport) // pass passport for configuration

// Init Web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"))
}

// Init Contract
var walletArtifact = require('./build/contracts/Wallet.json')
var walletIns = truffleContract(walletArtifact)
walletIns.setProvider(web3.currentProvider)

// set up our express application
app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public')) // static

app.set('view engine', 'ejs') // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session

// routes ======================================================================
// show the home page (will also have our login links)
app.get('/', function(req, res) {
    res.render('index.ejs')
})

// PROFILE SECTION =========================
app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user
    })
})

// LOGOUT ==============================
app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
})

// LOGIN ===============================
// show the login form
app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') })
})

// process the login form
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}))
    
// SIGNUP =================================
// show the signup form
app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') })
})

// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()

    res.redirect('/')
}

// launch ======================================================================
app.listen(port)
console.log('The magic happens on port ' + port)
