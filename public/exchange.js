full = 0;
if (localStorage["lastFive"]){
    $("#last5").text(localStorage["lastFive"]);
} else {
    $("#last5").text("No entries yet...");
}

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
          $("#last5").text(localStorage["lastFive"]);
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
                    $("#tweets").html("Here's Your tweets... <br>");
                    if(data.error){
                        $("#tweets").append(data.error);
                    } else{
                        for(i=0;i<data.myTweetArray.length;i++){
                            $("#tweets").append(data.myTweetArray[i].message+"<br>");
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
                    $("#reddit").html("Here's Your reddit... <br>");
                    if(data.error){
                        $("#reddit").append(data.error);
                    } else{
                        for(i=0;i<data.redditArray.length;i++){
                            $("#reddit").append(data.redditArray[i].title+"<br>");
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
    $("#top10").text("Loading top 10...");
    $.ajax({
        url: '/topten',
                type: "get",
                datatype: "json",
                success: function(data) {
                    //need format data json object into output
                    console.log(data);
                    $("#top10").text(data.topTen);
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
                    $("#top10").text(data.topTen);
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