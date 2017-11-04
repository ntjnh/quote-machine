$(document).ready(function() {
  $.ajaxSetup({
    cache: false
  });
  
  function newQuote() {
    $(".quote, .author").fadeOut("fast");    
    $.getJSON("//quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(quote) {
      var quoteText = quote[0].content.slice(3, -5);
      var quoteAuthor = quote[0].title;
      if (quoteText.length > 110) {
        newQuote();
      } else {
        $(".quote").html(quoteText);
        $(".author").html("— " + quoteAuthor);
        $(".quote, .author").delay(300).fadeIn(300);
      }
    });
  }
  
  newQuote();
  
  $("#new").click(function() {
    newQuote();
  });
  
  $(".share").on("click", function(e) {
    e.preventDefault();
    window.open("https://twitter.com/intent/tweet?text=" + $(".quote").text() + $(".author").text() + "&hashtags=designquote");
  });
});