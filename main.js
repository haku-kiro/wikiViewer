function makeCall() {
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
   				$("#container").append("<p>" + outData[x].title + "</p>");
   			}
   		}
   }