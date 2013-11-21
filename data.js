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



function topTen(){
    i=0;
    dataArray = [];
    searchData.topTen[i]=modeString(searchData.allData);
    console.log(searchData.allData);
    dataArray = searchData.allData.filter(modeString(searchData.allData));
    for(i=1;i<10;i++){
        searchData.topTen[i]=modeString(dataArray);
    }
}

now = '';

db.serialize(function(){
    db.each("select QUERY as QUERY from searches", function(err,row){
       console.log(row.QUERY);
       searchData.allData[i]=row.QUERY;
       i++
       console.log("The most common is:" + modeString(searchData.allData));
    },function(err,rows){
        console.log(err,rows); 
        i=0;
        dataArray = [];
        searchData.topTen[i]=modeString(searchData.allData);
        consol.log("Alldata data");
        console.log(searchData.allData);
        dataArray = searchData.allData.filter(modeString(searchData.allData));
        for(i=1;i<10;i++){
            searchData.topTen[i]=modeString(dataArray);
        }
    });
});

//console.log(searchData.topTen);


//}