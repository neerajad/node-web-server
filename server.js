const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); // register middleware

app.use((req,res, next) => {
  var log = `${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n');
  //next();
  res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrYear', () => {
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

// handler for http request
app.get('/', (req, res) => { // function which secifies what to send back to user
//res.send('<h1>Hello Express</h1>'); // response for the request
res.render('home.hbs', {
  title: 'Home',
  welcomemsg: 'Welcome to my home page'
});
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

// bind applicaion to port
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
