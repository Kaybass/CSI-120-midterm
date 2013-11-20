//https://github.com/mapbox/node-sqlite3/blob/master/README.md
db = new sqlite3.Database(':memory:');
db.serialize(function(){
    db.run("create table searches (ID INT PRIMARY KEY NOT NULL, QUERY TEXT NOT NULL,TIMESTAMP DATETIME NOT NULL)");
});
