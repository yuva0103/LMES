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
	var link=lin.trim();
	var cate = document.getElementById('cat').value;
	var GameScore = Parse.Object.extend("StoreVideoLink");
	var gameScore = new GameScore();
	gameScore.set("Title", title);
	gameScore.set("Category", cate);
	gameScore.set("Link", link);
	gameScore.save(null, {
	  success: function(gameScore) {
		window.location.reload(true);
	  },
	  error: function(gameScore, error) {
	  alert('Failed to create new object, with error code: ' + error.message);
	  }
	});
}
