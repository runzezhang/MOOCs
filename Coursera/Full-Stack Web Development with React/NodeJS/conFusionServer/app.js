var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// function auth (req, res, next) {
//   console.log(req.headers);
//   var authHeader = req.headers.authorization;
//   if (!authHeader) {
//       var err = new Error('You are not authenticated!');
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status = 401;
//       next(err);
//       return;
//   }

//   var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//   var user = auth[0];
//   var pass = auth[1];
//   if (user == 'admin' && pass == 'password') {
//       next(); // authorized
//   } else {
//       var err = new Error('You are not authenticated!');
//       res.setHeader('WWW-Authenticate', 'Basic');      
//       err.status = 401;
//       next(err);
//   }
// }

// app.use(auth);
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var index = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var config = require('./config');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

var passport = require('passport');
var authenticate = require('./authenticate');

// Connection URL
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useMongoClient: true,
  /* other options */
});

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => {
  console.log(err);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//app.use(cookieParser('12345-67890-09876-54321'));

// app.use(session({
//   name: 'session-id',
//   secret: '12345-67890-09876-54321',
//   saveUninitialized: false,
//   resave: false,
//   store: new FileStore()
// }));

app.use(passport.initialize());
// app.use(passport.session());

app.use('/', index);
app.use('/users', users);



app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;