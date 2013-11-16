app.post('/twittergrab', function(req, res){
/*twitter-js-client
var config = {
    consumerKey: twitterInfo.consumerKey,
    consumerSecret: twitterInfo.consumerSecret,
    accessToken: twitterInfo.accessToken,
    accessTokenSecret: twitterInfo.accessTokenSecret
}
var twitter = new Twitter(config)
*/
// using twitter api directly blech
    var query = {
		hash: req.body.SampleHash,
        oldest: req.body.oldest,
        latest: req.body.latest,
        number: req.body.number,
        distance: req.body.distance,
        latitude: req.body.latitude,
        longitude: req.body.longitude
	};
    
//query string for get request    
var queryStringPath = "https://api.twitter.com/1.1/search/tweets.json"
var queryString = encodeURIComponent("?q="+query.hash+"&geocode="+query.latitude+","+query.longitude+","+query.distance+"&count="+query.number+"&until="+query.latest+"&since="+query.oldest);

//getting oauth2 token for access to the api  
console.log("processing keys...");
var cKey = encodeURIComponent(twitterInfo.consumerKey);  //uri encode
var cSecret = encodeURIComponent(twitterInfo.consumerSecret); //uri encode
var twitterAuth = cKey+':'+cSecret; //combine
var twitterAuth = new Buffer(twitterAuth).toString('base64');   //convert to base64 
console.log("processed keys...");

console.log("preparing request data...");  
var authPostData = {
    "grant_type": "client_credentials"
};
authPostData = JSON.stringify(authPostData);
var options = {"hostname":'api.twitter.com',"port": 443, "path":"/oauth2/token", "method":"post",
headers: { "Host": 'api.twitter.com', "Authorization": "Basic "+twitterAuth,"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", "Content-Length": Buffer.byteLength(authPostData), "Accept-Encoding": "gzip"}}; //
console.log("finished request data...preparing request");
var authPostReq = https.request(options,function(res){
    console.log(res);   //This is where I'm supposed to get token data back from oauth2
});
authPostReq.on('error', function(e){
   console.log(e); 
});
console.log("finished request prep...posting request");
authPostReq.write(authPostData);
authPostReq.end();
console.log("finished request");
    //https://twitter.com/search?q=%23dude%20near%3A44.016274%2C-73.166653%20within%3A15mi%20since%3A2010-02-01%20until%3A2010-03-01&src=typd
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
    var userQuery = req.body;
    console.log(userQuery);
        
 //userQuery.sentimentScore = analyze(userQuery.area).score;
        //return 100 twitter posts into an array TwitterPosts inside one json object, userData
    
    userData = userQuery; //just for kicks
    res.json(userData);
});