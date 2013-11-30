var restler = require('restler');
                        
app.post('/redditgrab', function(req, res){    
    
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
    
var redditReturn = { redditArray: [] };

    var url = "http://json.reddit.com/search?q="+ encodeURIComponent(query.hash + ' ' + query.hash2) + "&restrict_sr=off&sort=relevance&t=all";
	var jace = [];
    console.log("making reddit query");
	restler.get(url).on('complete',function(tapkek){
		for(var i = 0; i < 5; i++){
            console.log(tapkek.data.children);
			jace[i] = tapkek.data.children[i].data;
        }
      redditReturn.redditArray = jace;
        console.log("completed reddit query");
	   res.json(redditReturn);
    });
});