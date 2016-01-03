var type = "";
$(document).ready( function() {
  $('.blog-getter').submit( function(event){
    // zero out results if previous search has run
    $('.results').html('');
    // get the value of the blog the user submitted
    var blog = $(this).find("input[name='blog']").val();
    getBlog(blog);
  });

  $(".video-btn").click(function() {
    type = "video";
    console.log(type);
  });
  $(".text-btn").click(function() {
    type = "text";
    console.log(type);
  });
  $(".picture-btn").click(function() {
    type = "photo";
    console.log(type);
  });
});

// this function takes the question object returned by StackOverflow 
// and creates new result to be appended to DOM
var showBlogger = function(response) {

  // clone our result template code
  var result = $('.templates .blogger').clone();
  if (response.type === "photo") {
    var picElem = result.find('.pic img');
    // Set the question properties in result
    var pic = response.photos[0].original_size.url;
    picElem.attr('src', pic);
  } else {
    $(".pic").hide();
  }
  if (response.type === "photo" || response.type === "video" ) {
    var captionElem = result.find('.caption');
    captionElem.html(response.caption);
  } else {
    var captionElem = result.find('.caption');
    captionElem.html(response.body);
  }
  
  if (response.type === 'video') {
    var videoElem = result.find('.video');
    videoElem.html(response.player[1].embed_code);
  }
  return result;
  console.log(blogger);
};

// this function takes the results object from Tumblr
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

var getBlog = function(blog) {

  // the parameters we need to pass in our request to StackOverflow's API


  var result = $.ajax({
    url: "http://api.tumblr.com/v2/blog/"+ blog +".tumblr.com/posts/"+type+"?api_key=JBNdCxSjpfubhEIUait9nCcP41MdlbNsJVY2WzM2aq2RjSbLlE",
    dataType: "jsonp",
    type: "GET",
  })
  .done(function(result){
    console.log(result.response.posts);
    var searchResults = showSearchResults(blog, result.response.posts.length);

    $('.search-results').html(searchResults);

    $.each(result.response.posts, function(i, response) {
      var blogger = showBlogger(response);
      $('.results').append(blogger);
      console.log(response);
    });
  })
  .fail(function(jqXHR, error, errorThrown){
    var errorElem = showError(error);
    $('.search-results').append(errorElem);
  });
};
