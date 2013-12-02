//https://github.com/mapbox/node-sqlite3/blob/master/README.md
db = new sqlite3.Database('twitter.db');

if (passedParams[2] == "newdb"){
//console.log(passedParams[2]);
db.serialize(function(){
    //console.log("Deleting Table");
    db.run("drop table searches",function(err,lastid,changes){
        //console.log(err,changes);
    });
    console.log("creating table");
    db.run("create table searches (ID INTEGER PRIMARY KEY AUTOINCREMENT, QUERY TEXT NOT NULL,TIMESTAMP TEXT NOT NULL)",function(err,lastid,changes){
        //console.log(err,changes);
});
    console.log("Example Data");
    db.run("insert into searches(ID,QUERY,TIMESTAMP) values(null,\"example query\",\""+Date()+"\")",function(err,lastid,changes){
        //console.log(err,changes);
});
});
}


if (passedParams[2] == "cleardb"){
    //console.log("Deleting Table");
    db.run("drop table searches",function(err,lastid,changes){
        //console.log(err,changes);
    });
}