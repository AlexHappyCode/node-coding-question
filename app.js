/* File: app.js */

/* loading .env file */
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

let createError  = require('http-errors');
let express      = require('express');
let path         = require('path');
let cookieParser = require('cookie-parser');
let logger       = require('morgan');
let fileUpload   = require('express-fileupload');
let { authenticateCookieToken } = require('./auth');

/* routers */
let indexRouter        = require('./routes/index');
let registrationRouter = require('./routes/registration');
let loginRouter        = require('./routes/login');
let postsRouter        = require('./routes/posts');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Middleware */
app.use('/', indexRouter);
app.use('/register', registrationRouter);
app.use('/login', loginRouter);
app.use(authenticateCookieToken);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
