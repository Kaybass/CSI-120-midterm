var restler = require('restler');

/*

	returns an array of JSONs of the data
	of the first five responses from the
	search query
	TODO: make it aware of what to do when it doesn't get anything back

*/

function getSearchJSON(req){
	var url = "http://json.reddit.com/search?q=" 
		+ req 
		+ "&restrict_sr=off&sort=relevance&t=all";
	var jace = new array(5);
    console.log("making reddit query");
	restler.get(url).on('complete',function(tapkek){
		for(var i = 0; i < 5; i++){
			jace[i] = tapkek.data.children[i].data;
        }
	});
	console.log("completed reddit query");
	return jace;
}
//getSearchJSON("maobama");
                        
app.post('/redditgrab', function(req, res){

    var query = {
		hash: req.body.SampleHash,
        oldest: req.body.oldest,
        latest: req.body.latest,
        number: req.body.number,
        distance: req.body.distance+'mi',
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        order: req.body.order
	};
    
var redditReturn = { redditArray: [] };
redditReturn.redditArray = getSearchJSON(query.hash);
res.json(redditReturn);

});