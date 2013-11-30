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


var query = {
		hash: req.body.SampleHash,
        hash2: req.body.SampleHash2,
        oldest: req.body.oldest,
        latest: req.body.latest,
        number: req.body.number,
        distance: req.body.distance+'mi',
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        order: req.body.order
	};
    
//SQlite3
if(query.hash){
db.serialize(function(){
    db.run("insert into searches(ID,QUERY,TIMESTAMP) values(null,\""+query.hash+"\",\""+Date()+"\")",function(err,lastid,changes){
            console.log(err,changes);
    });
    db.run("insert into searches(ID,QUERY,TIMESTAMP) values(null,\""+query.hash2+"\",\""+Date()+"\")",function(err,lastid,changes){
            console.log(err,changes);
    });
});
}

    
//query string for get request    
var queryStringPath = "https://api.twitter.com/1.1/search/tweets.json"
var queryString = "?q="+encodeURIComponent(query.hash)+" "+encodeURIComponent(query.hash2)+"&geocode="+encodeURIComponent(query.latitude)+","+encodeURIComponent(query.longitude)+","+encodeURIComponent(query.distance)+"&count="+encodeURIComponent(query.number)+"&until="+encodeURIComponent(query.latest)+"&since="+encodeURIComponent(query.oldest);

//mtwitter api attempt
params = {
    q: query.hash+' '+query.hash2,
    geocode: query.latitude+','+query.longitude+','+query.distance,
    since: query.oldest,
    until: query.latest,
    count: query.number    
    };
    
twitter = new Twitter({
consumer_key: twitterInfo.consumerKey,
consumer_secret: twitterInfo.consumerSecret,
application_only: true    
});

twitter.get('search/tweets',params,function(err, myTweets) {
  console.log(err, myTweets);
    var myQuery = {
        myTweetArray: [], sentimentAvg : 0  
    };
    if(myTweets){
        for(var i=0;i<query.number;i++){
            myQuery.myTweetArray[i] = { screenName: myTweets.statuses[i].user.screen_name, date: myTweets.statuses[i].created_at, profileImg: myTweets.statuses[i].user.profile_image_url, hashTags:  myTweets.statuses[i].entities.hashtags,  message: myTweets.statuses[i].text, sentiment: analyze(myTweets.statuses[i].text)};     
            myQuery.sentimentAvg = myQuery.myTweetArray[i].sentiment.score + parseInt(myQuery.sentimentAvg);
            } 
        myQuery.sentimentAvg = myQuery.sentimentAvg/query.number;
    } else {
        myQuery = { error: "No tweets" };
    }
    
    function sortFunction(a,b){
        if (query.order==2) {
            return a.sentiment.score - b.sentiment.score;
        }
        else if (query.order==1) {
            return b.sentiment.score - a.sentiment.score;
        }
    } 
    
    if(myTweets){
    myQuery.myTweetArray = myQuery.myTweetArray.sort(sortFunction);
    }
    

    res.json(myQuery);
});

    
 //userQuery.sentimentScore = analyze(userQuery.area).score;
        //return 100 twitter posts into an array TwitterPosts inside one json object, userData
    
});