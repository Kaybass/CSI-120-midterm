express = require('express');
http = require("http");
https = require("https");
ejs = require('ejs');
app = express();
OAuth2 = require('OAuth').OAuth2;
analyze = require('Sentimental').analyze;
Twitter = require('mtwitter');
sqlite3 = require('sqlite3').verbose();

//encapsulate array of parameters
passedParams = [];
process.argv.forEach(function(val,index,array){
   console.log(index + ': ' + val);
    passedParams[index] = val;
});


// handle posts in express
app.use(express.bodyParser());

// use root '/' to access public files folder ie '/index.html'
app.use('/', express.static(__dirname + '/public'));

// use Embedded Javascript templating
app.engine('html', ejs.renderFile);

require('./AuthenticationSettings.js');
require('./model.js');
require('./TwitterApiQuery.js');
require('./data.js');


app.get('/',function(req,res){
    
    res.render('MainPage.ejs',searchData);

});


//seetwitterapi for ajax response

app.listen(3000);
