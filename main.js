/*  
    Uses express, dbcon for database connection, body parser to parse form data 
    handlebars for HTML templates  
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');


var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/owner', require('./owner.js')); //added by me 
app.use('/doctor', require('./doctor.js')); //added by me 
app.use('/pet', require('./pet.js')); //added by me
app.use('/medication', require('./medication.js')); //added by me
app.use('/appointment', require('./appointment.js')); //added by me
app.use('/petMed', require('./petMed.js')); //added by me
app.use('/petVet', require('./petVet.js')); //added by me
//app.set('port', 3123);
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
