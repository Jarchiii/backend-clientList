require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const hbs          = require('hbs');
const favicon      = require('serve-favicon')
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");


mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//Cors
// this rule allows the client app to exchange via http via the server (AJAX ... Axios)
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials : true,


  /* credentials : Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials */
  optionsSuccessStatus: 200
};

// cors middle on
app.use(cors(corsOptions));

/*------------------------------------------
// USER SESSIONS : START
------------------------------------------*/
app.use(
  session({
    secret: "some secret goes here",
    resave: true,
    saveUninitialized: true
  })
);
// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());

// ADD SESSION SETTINGS HERE:

/*------------------------------------------
// USER SESSIONS : END
------------------------------------------*/

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


app.use('/', require("./routes/auth"))
app.use('/', require("./routes/users"));
app.use('/', require("./routes/clients"))


module.exports = app;
