full = 0;

function SubmitPosition(pos){
          if (localStorage["lastFive"]){
              for(i=0;i<5;i++){
                    lastFive = JSON.parse(localStorage["lastFive"]);
                    if(lastFive[i]){
                        full = i;
                    }
              }
              if(full > 3){
                    lastFive.shift();
                    full=3;
                    if($("#SampleHash2").val().length > 0){
                        lastFive.shift();
                        full=2;
                    }
               }
              lastFive[full+1]=$("#SampleHash").val();
              if($("#SampleHash2").val().length > 0){
                lastFive[full+2]=$("#SampleHash2").val();
              }
              localStorage["lastFive"]=JSON.stringify(lastFive);
            } else {
                lastFive=[];
                lastFive[0]=$("#SampleHash").val();
                if($("#SampleHash2").val().length > 0){
                    lastFive[1]=$("#SampleHash2").val();
                }
                localStorage["lastFive"]=JSON.stringify(lastFive);
            }
            $("#lastFive").html('<h4 class="headings">Your Last Five Searches</h4><ul></ul>');
    lastFive = JSON.parse(localStorage["lastFive"]);
            for(i=0;i<lastFive.length;i++){
                $("#lastFive ul").append('<li>'+lastFive[i]+'</li>');
            }
          $("#latitude").val(pos.coords.latitude);
          $("#longitude").val(pos.coords.longitude);
          var mydata = $("#myForm").serialize();
            $.ajax({
                url: '/twittergrab',
                type: "post",
                datatype: "json",
                data: mydata,
                success: function(data) {
                    //need format data json object into output
                    console.log(data);
                    $("#tweets").html("Loading Tweets....");
                    if(data.error){
                        $("#tweets").append(data.error);
                    } else{
                        for(i=0;i<data.myTweetArray.length;i++){
                            hashTagText = "";
                            for(b=0;b<data.myTweetArray[i].hashTags.length;b++){
                                hashTagText = hashTagText+'<div><div class="tweet">#'+data.myTweetArray[i].hashTags[b].text+'</div></div>';
                            }
                            $("#tweets").append('<div class="resultcontainer"><div><div class="resultleft">'+data.myTweetArray[i].screenName+'</div><div>'+data.myTweetArray[i].date+'</div></div><div><div class="resultleft"><img src="'+data.myTweetArray[i].profileImg+'" alt="twitter pic"></div><div class="tweet">'+data.myTweetArray[i].message+'</div></div><div><div class="tweet">Sentiment: '+data.myTweetArray[i].sentiment.score+'</div></div>'+hashTagText);
                        }
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('error ' + textStatus + " " + errorThrown + ";");
                }
            });   
            
            $.ajax({
                 url: '/redditgrab',
                type: "post",
                datatype: "json",
                data: mydata,
                success: function(data) {
                    //need format data json object into output
                    console.log(data);
                    $("#reddit").html("Loading Reddit...</br><ol></ol>");
                    if(data.error){
                        $("#reddit").append(data.error);
                    } else{
                        for(i=0;i<data.redditArray.length;i++){
                            $("#reddit ol").append('<li><a href="' + data.redditArray[i].url + '">'+data.redditArray[i].title +'</a></li>');
                        }
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('error ' + textStatus + " " + errorThrown + ";");
                }
                //ajax request for reddit api
            });
            
            
        }

$(document).ready(function() {
    if (localStorage["lastFive"]){
    $("#lastFive").html('<h4 class="headings">Your Last Five Searches</h4><ul></ul>');
    lastFive = JSON.parse(localStorage["lastFive"]);
    for(i=0;i<lastFive.length;i++){
        $("#lastFive ul").append('<li>'+lastFive[i]+'</li>');
    }
    } else {
    $("#lastFive").text("No entries yet...");
    }
    
    
    
    
    
    $("#topTen").html('<h4 class="headings"> Loading top 10... </h4>');
    $.ajax({
        url: '/topten',
                type: "get",
                datatype: "json",
                success: function(data) {
                    //need format data json object into output
                    console.log(data);
                    $("#topTen").html('<h4 class="headings">Top Ten Searches of All Time</h4><ol></ol>');
                    for(i=0;i<data.topTen.length;i++){
                        $("#topTen ol").append('<li>'+(i+1)+'. '+data.topTen[i]+'</li>');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('error ' + textStatus + " " + errorThrown + ";");
                }
    });
    setInterval(function(){
    $.ajax({
        url: '/topten',
                type: "get",
                datatype: "json",
                success: function(data) {
                    //need format data json object into output
                    console.log(data);
                    $("#topTen").html('<h4 class="headings">Top Ten Searches of All Time</h4><ol></ol>');
                    for(i=0;i<data.topTen.length;i++){
                        $("#topTen ol").append('<li>'+(i+1)+'. '+data.topTen[i]+'</li>');
                    }
                    },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('error ' + textStatus + " " + errorThrown + ";");
                }
    });
    },10000);
    
    
    $("#submit").click(function(){
        /*
        $.post("/twittergrab",$("myForm").serialize(),function(data){
            $("div").append(data.name);
        },"json");
        */
  
        if (navigator.geolocation)
        {
        navigator.geolocation.getCurrentPosition(SubmitPosition);
        }
        else{x.innerHTML="Geolocation is not supported by this browser.";}
        
    });

    
    
    $("#number").mouseup(function(){
        $("#rangeNum").text($("#number").val());
    });
});