var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var twitterKeys = require("./keys.js");

function displayTweets() {
  var client = new Twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
  });

  var params = { screen_name: "modemtone" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (i = 19; i >= 0; i--) {
        console.log("----------");
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
      }
    }
  });
}

var operation = process.argv[2];
var searchString = "";

if (
  process.argv[3] &&
  (operation == "spotify-this-song" || operation == "movie-this")
) {
  for (i = 3; i < process.argv.length; i++) {
    searchString += process.argv[i] + " ";
  }
  searchString.trim();
}

switch (operation) {
  case "my-tweets":
    displayTweets();
    break;
  case "spotify-this-song":
    // spotifySearch();
    break;
  case "movie-this":
    // omdbSearch();
    break;
  case "do-what-it-says":
    // nobodyLikesTheBackstreetBoys();
    break;
  default:
    console.log("Invalid Input!");
}
