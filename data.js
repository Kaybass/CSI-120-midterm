//app.post('/database', function(req, res){
searchData = {
    topTen: [],
    allData: []
}

i=0;
a='';
dataArray = [];

function modeString(array)
{
    if(array.length == 0)
    	return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
    	var el = array[i];
    	if(modeMap[el] == null)
    		modeMap[el] = 1;
    	else
    		modeMap[el]++;	
    	if(modeMap[el] > maxCount)
    	{
    		maxEl = el;
    		maxCount = modeMap[el];
    	}
    }
    return maxEl;
}

function filterForString(element, index, array){
    return (element!=modeString(array));
};

function topTen(){
    i=0;
    dataArray = [];
    searchData.topTen[i]=modeString(searchData.allData);
    //console.log(searchData.allData);
    dataArray = searchData.allData.filter(filterForString);
    for(i=1;i<10;i++){
        searchData.topTen[i]=modeString(dataArray);
        dataArray = dataArray.filter(filterForString);
    }
    myTopTen = { topTen: searchData.topTen };
}

function foo(){
       //console.log(row.QUERY);
       searchData.allData[i]=row.QUERY;
       i++;
       //console.log("The most common is:" + modeString(searchData.allData));   
}
now = '';
myRows=0;

db.serialize(function(){
    db.all("select QUERY as QUERY from searches", function(err,rows){
       for(i=0;i<rows.length;i++){
            searchData.allData[i]=rows[i].QUERY;
        }
    }
);
});
setTimeout(function(){
    topTen();
    setInterval(function(){
        topTen();
    },15000);
},5000);
setInterval(function(){
db.serialize(function(){
    db.all("select QUERY as QUERY from searches", function(err,rows){
       for(i=0;i<rows.length;i++){
            searchData.allData[i]=rows[i].QUERY;
        }
    }
);
});
},15000);


//console.log(searchData.topTen);
setTimeout(function(){
    //console.log(searchData.topTen);
app.get('/topten', function(req, res){
    //console.log("sending myTopTen");
    res.json(myTopTen);
});
},10000);
//}
