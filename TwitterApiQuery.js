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
        distance: req.body.distance+'mi',
        latitude: req.body.latitude,
        longitude: req.body.longitude
	};
    
//query string for get request    
var queryStringPath = "https://api.twitter.com/1.1/search/tweets.json"
var queryString = "?q="+encodeURIComponent(query.hash)+"&geocode="+encodeURIComponent(query.latitude)+","+encodeURIComponent(query.longitude)+","+encodeURIComponent(query.distance)+"&count="+encodeURIComponent(query.number)+"&until="+encodeURIComponent(query.latest)+"&since="+encodeURIComponent(query.oldest);
/* twitter api authentication ewww
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
*/
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
    
//USING OAUTH LIBRARY TO ACCESS TWITTER
var oauth2req = new OAuth2(twitterInfo.consumerKey,twitterInfo.consumerSecret,'https://api.twitter.com/',null,'oauth2/token',null);

oauth2req.getOAuthAccessToken('',{ 'grant_type': 'client_credentials' }, function(e, access_token){
    var myTweets;
    console.log(access_token);
    twitterToken=access_token;
    
    console.log("loading options..");
    var twitterOptions = {
        hostname: 'api.twitter.com',
        path: queryStringPath+queryString,
        headers: {
            Authorization: 'Bearer ' + twitterToken
        }
    };
    console.log(twitterOptions.path);
    
  
    console.log("making request...");
    https.get(twitterOptions,function(result){
        var mybuffer;
        result.setEncoding('utf8');
        result.on('data', function(data){
            mybuffer = data;
        });
        result.on('end',function(){
            console.log("parsing...");
            myTweets = mybuffer;
            console.log("parsed");
            console.log(myTweets);
        });
        result.on('error',function(res){
            consol.log(res);
        });
    });
    
 
    var myQuery = {
       myTweetArray: []   
    };
    for(var i=0;i<parseInt(query.number);i++){
        myQuery.myTweetArray[i] = { screenName: myTweets.statuses[i].user.screen_name, 
        date: myTweets.statuses[i].created_at, profileImg: myTweets.statuses[i].user.profile_image_url, hashTags:  myTweets.statuses[i].hashtags,  message: myTweets.statuses[i].text, sentiment: analyze(myTweets.statuses[i].text)};      }
    
    
    console.log(myQuery);
    res.json(myQuery);
    
});



        
 //userQuery.sentimentScore = analyze(userQuery.area).score;
        //return 100 twitter posts into an array TwitterPosts inside one json object, userData
    
});