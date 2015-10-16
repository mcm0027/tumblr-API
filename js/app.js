var d = new Date();
var time = d.getTime();
window.n = Math.floor(time * .001);
 

var timesThrough = 0;
$(document).ready( function() {
	$('.unanswered-getter').submit( function(event){
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='tags']").val();

		getUnanswered(tags);
	});

});

// this function takes the question object returned by StackOverflow 
// and creates new result to be appended to DOM
var showQuestion = function(response) {
	
	// clone our result template code
	var result = $('.templates .question').clone();

	// Set the question properties in result

	if(response.type=="photo") {

		var questionElem = result.find('.pic img');
		var pic = JSON.stringify(response["photos"][0]["alt_sizes"][0].url);
		pic = pic.replace(/['"]+/g, '')
		//console.log(pic);
		questionElem.attr('src', pic);

		var blogName = result.find('.blog');
		blogName.text(response.blog_name);
	} else {

	}

	/*// set the date asked property in result
	var asked = result.find('.asked-date');
	var date = new Date(1000*question.creation_date);
	asked.text(date.toString());
*/
	//set the #views for question property in result
	
/*
	// set some properties related to asker
	var asker = result.find('.asker');
	asker.html('<p>Name: <a target="_blank" href=http://stackoverflow.com/users/' + question.owner.user_id + ' >' +
													question.owner.display_name +
												'</a>' +
							'</p>' +
 							'<p>Reputation: ' + question.owner.reputation + '</p>'
	);

*/

	return result;

};

// this function takes the results object from StackOverflow
// and creates info about search results to be appended to DOM
var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query;
	return results;
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};


var newGetPictures = function(timestamp, tags) {

		var callFunctions = 0;

		console.log("New n: " + window.n)

		// the parameters we need to pass in our request to StackOverflow's API
		var request = {				tag: tags,
									api_key: "DMUVn7wI79JC8IdTOIhyFO16b4e2BEbTRYSAu7Jstz1oVXlcnc",
									type: "photo",
									before: window.n,
									limit: 20
								}


		var result = $.ajax({
			url: "http://api.tumblr.com/v2/tagged",
			data: request,
			dataType: "jsonp",
			type: "GET",
			})
			
		.done(function(result){
			
			result["timestamp"] = result["response"][19].timestamp;
			console.log("result: "+ JSON.stringify(result.timestamp));
			//window.n = result["response"][19].timestamp;
			var searchResults = showSearchResults(request.tagged, result.response.length);
			
		
			$('.search-results').html(searchResults);

			$.each(result.response, function(i, response) {
				var question = showQuestion(response);
				$('.results').append(question);
				
			});
			if (callFunctions < 3) {
				newGetPictures(result.timestamp, tags);
				callFunctions++;
		}
		
		})
		.fail(function(jqXHR, error, errorThrown){
			var errorElem = showError(error);
			$('.search-results').append(errorElem);

		});
}
// takes a string of semi-colon separated tags to be searched
// for on StackOverflow
var getUnanswered = function(tags) {
	


	for(i=0; i <= 0; i++) {

		newGetPictures(n, tags);
		
		
	}
};

