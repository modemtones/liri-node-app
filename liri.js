var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
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

function spotifySearch() {
  var spotify = new Spotify({
    id: "e45ed3cdf4e4442a8bc1fc79a1c2fa0f",
    secret: ""
  });

  spotify
    .search({ type: "track", query: searchString })
    .then(function(response) {
      // console.log(response.tracks.items[0]);
      console.log(
        "The artist name is " + response.tracks.items[0].album.artists[0].name
      );
      console.log(
        "The song title is " + response.tracks.items[0].name
      );
      console.log(
        "The song is from the album " +
          response.tracks.items[0].album.name
      );
      console.log(
        "The song preview url is " +
          response.tracks.items[0].preview_url);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function omdbSearch() {
  if (!searchString) {
    searchString = "mr+nobody";
  }
  var queryUrl =
    "http://www.omdbapi.com/?t=" + searchString + "&plot=short&apikey=40e9cece";

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      if (!JSON.parse(body).Error) {
        // console.log(JSON.parse(body));
        console.log(JSON.parse(body).Title);
        console.log("Released in " + JSON.parse(body).Year);
        console.log("IMDB Rating of " + JSON.parse(body).imdbRating);
        console.log(
          "Rotten Tomatoes Rating of " + JSON.parse(body).Ratings[1].Value
        );
        console.log("Produced in " + JSON.parse(body).Country);
        console.log(
          "Languages spoken in the movie are " + JSON.parse(body).Language
        );
        console.log("Plot? Here you go: " + JSON.parse(body).Plot);
        console.log(
          "The leading actors/actresses are " + JSON.parse(body).Actors
        );
        return;
      }
      console.log("Movie Not Found!");
    }
  });
}

function nobodyLikesTheBackstreetBoys() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    searchString = dataArr[1].slice(1, -1);
    // searchString = searchString.split(" ").join("+");
    console.log("No, I do not want it that way. Everyone knows O-Town was better.");
    spotifySearch();
  });
}

var operation = process.argv[2];
var searchString = "";

if (
  process.argv[3] &&
  (operation == "spotify-this-song" || operation == "movie-this")
) {
  for (i = 3; i < process.argv.length; i++) {
    searchString += "+" + process.argv[i];
  }
  searchString = searchString.substr(1);
}

switch (operation) {
  case "my-tweets":
    displayTweets();
    break;
  case "spotify-this-song":
    spotifySearch();
    break;
  case "movie-this":
    omdbSearch();
    break;
  case "do-what-it-says":
    nobodyLikesTheBackstreetBoys();
    break;
  default:
    console.log("Invalid Input!");
}
