app.post('/twittergrab', function(req, res){

    
/* using twitter api directly blech
    var query = {
		hash: req.body.SampleHash,
        oldest: req.body.oldest,
        latest: req.body.latest,
        number: req.body.number,
        distance: req.body.distance,
        latitude: req.body.latitude,
        longitude: req.body.longitude
	};
	var queryStringParts = {
          
    };
    
    var queryStringPath = "https://api.twitter.com/1.1/search/tweets.json"
    var queryString = "?q="+query.hash+"&geocode="+query.latitude+","+query.longitude+","+query.distance+"&count="+query.number+"&until="query.latest+"&since="+query.oldest;

var twitterQuery;
    Authorization:
OAuth oauth_consumer_key="DC0sePOBbQ8bYdC8r4Smg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1384562887",oauth_nonce="-229746174",oauth_version="1.0",oauth_token="416744660-eyAMGMAhI3ZfJK6F69QaFOBdJktWST7XbLHrFfCB",oauth_signature="xXCY4F0BSd8jhxHE3COtYVYuQZE%3D"
https.request({hostname:'api.twitter.com',port: 443, path:"/1.1/search/tweets.json", method:"get"},function(res){
    
    
});    
    //https://twitter.com/search?q=%23dude%20near%3A44.016274%2C-73.166653%20within%3A15mi%20since%3A2010-02-01%20until%3A2010-03-01&src=typd
    */
	//http.get()
    /* Twitter.js stuff.  Twitter.js sucks so far
    var twitter = new twitterAPI({
        consumerKey: twitterInfo.consumerKey,
        consumerSecret: twitterInfo.consumerSecret,
        callback: ''
	
    });
    var myRequestToken = '';
    var myRequestTokenSecret='';
    var twitterRequest = twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token: " + error);
        } else {
            myRequestToken = requestToken;
            myRequestTokenSecret = requestTokenSecret;
        }
    });
   
   	twitter.search('nodejs OR #node', function(data) {
    console.log(util.inspect(data));
	});
	*/
        //enter hash tags into databsase
        //get twitter requests from api with req.body
    console.log(req.body);
    var userQuery = req.body;
    console.log(userQuery);
        
 //userQuery.sentimentScore = analyze(userQuery.area).score;
        //return 100 twitter posts into an array TwitterPosts inside one json object, userData
    
    userData = userQuery; //just for kicks
    res.json(userData);
});