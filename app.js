const express = require('express')
const http = require('http')
const expressLayouts = require('express-ejs-layouts')
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const engines = require('consolidate')
const session = require('express-session')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const expressStatusMonitor = require('express-status-monitor')
const LOG = require('./utils/logger.js')
const logfile = '/access.log'
const app = express()  // make express app
const port = process.env.PORT  || 9999
const fs = require('fs')


// ADD THESE COMMENTS AND IMPLEMENTATION HERE
// 1 set up the view engine
// 2 include public assets and use bodyParser
// 3 set up the logger
// 4 handle valid GET requests
// 5 handle valid POST request
// 6 respond with 404 if a bad URI is requested
dotenv.load({ path: '.env' })
LOG.info('Environment variables loaded.')
app.set('views', path.resolve(__dirname, 'views')) // path to views
app.set('view engine', 'ejs') // specify our view engine

// 2 include public assets and use bodyParser
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressLayouts)
app.use(errorHandler()) // load error handler

// 3 log requests to stdout and also
// log HTTP requests to a file using the standard Apache combined format
//var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
//app.use(logger('dev'));
//app.use(logger('combined', { stream: accessLogStream }));

const routes = require('./routes/index.js');
app.use('/',routes);
LOG.info('Routing set as /routes/index.js');

// app.get("/", function (req, res) {
//   //res.sendFile(path.join(__dirname + '/assets/index.html'))
//   res.render("index.ejs")
//  })

//  app.get("/index", function (req, res) {
//   //res.sendFile(path.join(__dirname + '/assets/index.html'))
//   res.render("index.ejs")
//  })

//  app.get("/products", function (req, res) {
//   res.render("products.ejs")
//  })

//  app.get("/order", function (req, res) {
//   res.render("order.ejs")
//  })

//  app.get("/orderLineItem", function (req, res) {
//   res.render("orderLineItem/index.ejs")
//  })

//  app.get("/customer", function (req, res) {
//   res.render("customer.ejs")
//  })

//  app.get("/about", function (req, res) {
//   res.render("aboutus.ejs")
//  })

//  app.get("/contact", function (req, res) {
//   res.render("contactus.ejs")
//  })
// //  app.get("/404", function (req, res) {
// //   res.render("404.ejs")
// //  })
//  app.get(function (req, res) {
//   res.render('404')
// })

// initialize data ............................................
require('./utils/seeder.js')(app)  
 
 // Listen for an application request on designated port
 app.listen(process.env.PORT || port, function () {
  console.log('Web app started and listening on http://localhost:' + port)
  console.log('\nLogs will be sent to this terminal and ' + logfile + '.')
 })