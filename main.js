function makeCall() {
    //add error checking to make sure that a user can't search null
    var term = document.getElementById("txtBox").value;
    var api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+ term +"&callback=JSON_CALLBACK";
    $.ajax({
      url: api,
      data: {
         format: 'json'
      },
      error: function() {
         console.log("There was an error!");
      },
      dataType: 'jsonp',
      success: function(data) {
		//callback here to use the data
        useData(data);

      },
      type: 'GET'
   });
}
   
    //callback function
   function useData(data)
   {
       //first want to clear the container div:
       $("#container").empty();
       
   		var outData = data.query.pages;
   		console.log(data);


   		for (var x in outData)
   		{
   			if (outData.hasOwnProperty(x))
   			{
   				console.log(outData[x].title);
   				$("#container").append('<div class="entry"><h4 class="title">' + outData[x].title + '</h4><p class="extract">' + outData[x].extract+ '</p></div>');
   			}
   		}
   }
   
   //using delegate so that when an entry is added a function is added to it as well
   $("#container").delegate("div", "click", function(){
       //does what I need it to
       console.log("You clicked an entry");
       //for the life of me I can't figure out how to work with this other than use innerHTML
       var text = this.innerHTML;
       //so I'll have to do some string manipulation
       var title = text.substring(text.indexOf('title') + 7, text.indexOf("</"));
       console.log(title);
       window.open("https://en.wikipedia.org/wiki/" + title);
   });
   
   