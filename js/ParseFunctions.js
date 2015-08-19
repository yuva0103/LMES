Parse.initialize("x6zuWvAxpkxKw3hHsFQL43Z4311Mxqt2jSdXjIFs", "ma4pU7RJaQSHpFnrmLRuK9vDvgNcWCXSoD4kktWh");

function validateForm() {
   	var title = document.getElementById('title').value;   
	var lin = document.getElementById('link').value;
	var link=lin.trim();
	var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if (title == null || title == "") {
        document.getElementById("error").innerHTML = "Title must be filled out";
		return false;
    }
	else if(link == null || link == ""){
        document.getElementById("error").innerHTML = "Link must be filled out";
		return false;
    }
	else if(!regex.test(link)){
        document.getElementById("error").innerHTML = "Link must be a Valid URL";
		return false;
  	}
  	else
  	{
  		myExits(link);
	  }
 }

function myExits(url)
{
	var GameScore = Parse.Object.extend("jj");
	var query = new Parse.Query(GameScore);
	query.equalTo("link", url);
	query.find({
	  success: function(results) {
	  if (results.length > 0) {
		  document.getElementById("error").innerHTML = "Link URL Already Exits";
		  alert("Link URL Alredy Exists");
		return false;
	  }else
	  {
		  myFunction();
	  }
	 }
 });
}

function myFunction() {
	var title = document.getElementById('title').value;
	var lin = document.getElementById('link').value;
	var link = lin.trim();
	var cate = document.getElementById('cat').value;
	var GameScore = Parse.Object.extend("jj");
	var gameScore = new GameScore();
	gameScore.set("title", title);
	gameScore.set("category", cate);
	gameScore.set("link", link);
	gameScore.set("createdby", "admin");
	gameScore.save(null, {
		success : function(gameScore) {
			alert("Succesfully added");
			window.location.reload(true);
		},
		error : function(gameScore, error) {
			alert('Failed to create new object, with error code: '
					+ error.message);
		}
	});
}

$( document ).ready(function() {
	var GameScore = Parse.Object.extend("jj");
	var query = new Parse.Query(GameScore);
	query.equalTo("createdby", "admin");
	query.find({
		success: function(results) {
			var myhtml = "";
			myhtml += ""
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					var id=object.get("objectId");
					var title = object.get("title");
					var link = object.get("link");
					var category = object.get("category");
					var id=object.id;
					myhtml += "<tr><td>" + title +"</td>"
					myhtml += "<td>"+link+"</td>"
					myhtml += "<td>"+category+"</td>";
					myhtml += "<td><img src='image/dele.png' height='16' width='16' onclick='myDelete(&apos;"+id+"&apos;)'></td></tr>";
				}
			listing.innerHTML += myhtml;
			$('#listing').dataTable( {
			    "order": [],
			    "columnDefs": [ {
			      "targets"  : 'no-sort',
			      "orderable": false,
			    }]
			});
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
});

function myDelete(id) {
	var GameScore = Parse.Object.extend("jj");
	var query = new Parse.Query(GameScore);
	query.get(id, {
		success : function(gameScore) {
			gameScore.destroy({});
			alert("Delete Sucess");
			window.location.reload(true);
		},
		error : function(object, error) {

		}
	});
}