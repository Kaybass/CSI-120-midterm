app.post('/twittergrab', function(req, res){
    
    
    var twitter = new twitterAPI({
        consumerKey: twitterInfo.consumerKey,
        consumerSecret: twitterInfo.consumerSecret,
        callback: ''
	
    });
    var myRequestToken = '';
    var myRequestTokenSecret='';
    var twitterRequest = twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            //console.log("Error getting OAuth request token: " + error);
        } else {
            myRequestToken = requestToken;
            myRequestTokenSecret = requestTokenSecret;
        }
    });
        //enter hash tags into database
        //get twitter requests from api with req.body
    var userQuery = req.body;
        
 //userQuery.sentimentScore = analyze(userQuery.area).score;
        //return 100 twitter posts into an array TwitterPosts inside one json object, userData
    
    userData = userQuery; //just for kicks
    res.contentType('json');
    res.send(userData);
});