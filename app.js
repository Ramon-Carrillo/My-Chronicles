require('dotenv').config();
const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const methodOverride = require('method-override');

// views (ejs and layouts) set up
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

// body parser middelware
app.use(express.urlencoded({ extended: false }));

// method-override allows you to override methods with a query parameter
app.use(methodOverride('_method'));

// session middleware
app.use(
  session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// flash middleware (must go AFTER session middleware)
app.use(flash());

// custom middleware
app.use((req, res, next) => {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// controllers middleware
app.use('/auth', require('./controllers/auth'));

// entry controller
app.use('/entry', require('./controllers/entry'));

// image controller
app.use('/image', require('./controllers/image'));

// home route
app.get('/', isLoggedIn, (req, res) => {
  res.render('home');
});

// profile route
app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

let PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(' on 5000');
});
