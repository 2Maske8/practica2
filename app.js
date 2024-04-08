var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); 
var logger = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var carritoRouter = require('./routes/carrito');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Generar un identificador único
const peach = uuid.v4();

// Cifrar el identificador de sesión
const toad = bcrypt.hashSync(peach, 10);

app.use(expressSession({
  secret: toad, 
  resave: true, 
  saveUninitialized: false, 
  cookie: { secure: false }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'main' });

app.disable('etag');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/carrito', carritoRouter);

//Error 404
app.use(function(req, res, next) {
  next(createError(404));
});

//Error 500
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
