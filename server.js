express = require('express');
http = require("http");
https = require("https");
ejs = require('ejs');
app = express();
OAuth2 = require('OAuth').OAuth2;
analyze = require('sentiment').analyze;
bookshelf = require('bookshelf');
sqlite3 = bookshelf.initialize({
	client: 'sqlite3',
	connection: {
		host : '127.0.0.1',
		charset: 'utf8'
	}
});

User = sqlite3.Model.extend({
	tablename: 'HashQueries'	
});



// handle posts in express
app.use(express.bodyParser());

// use root '/' to access public files folder ie '/index.html'
app.use('/', express.static(__dirname + '/public'));

// use Embedded Javascript templating
app.engine('html', ejs.renderFile);

require('./AuthenticationSettings.js');
require('./TwitterApiQuery.js');

app.get('/',function(req,res){
    
    res.render('MainPage.ejs');

});


//seetwitterapi for ajax response

app.listen(3000);
