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
	restler.get(url).on('complete',function(tapkek){
		for(var i = 0; i < 5; i++){
			jace[i] = tapkek.data.children[i].data;
	});
	
	return jace;
}
//getSearchJSON("maobama");