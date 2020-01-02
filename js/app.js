"use strict";

function newQuote() {
  const quoteDiv = document.querySelector(".quote");
  const authorH5 = document.querySelector(".author");

  quoteDiv.innerHTML = "Loading...";
  authorH5.innerHTML = "";

  const quotes = new XMLHttpRequest();
  quotes.onreadystatechange = function() {
    if (quotes.readyState === 4) {
      if (quotes.status === 200) {
        const quoteData = JSON.parse(quotes.responseText);
        const quote = quoteData[0].content.rendered;
        const quoteText = quote.slice(3, -5);
        const quoteAuthor = quoteData[0].title.rendered;

        if (quoteText.length > 110) {
          newQuote();
        } else {
          quoteDiv.innerHTML = quoteText;
          authorH5.innerHTML = " &#8212; " + quoteAuthor;
        }

      } else {
        alert(quotes.status);
      }
    }
  };
  const bustCache = '&now=' + new Date().getTime();
  const quoteUrl = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&per_page=1";
  quotes.open("GET", quoteUrl + bustCache, true);
  quotes.send();
}

newQuote();

const newQuoteButton = document.getElementById("new");
const shareButton = document.querySelector(".share");

newQuoteButton.addEventListener("click", newQuote);

shareButton.addEventListener("click", e => {
  e.preventDefault();
  window.open("https://twitter.com/intent/tweet?text=" + document.querySelector(".quote").textContent + " — " + document.querySelector(".author").textContent.slice(3) + "&hashtags=quotesondesign");
});