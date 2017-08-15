// require the keys.js file that holds my twitter keys
var twitterKey = require("./keys.js");

// require twitter, spotify, and request npm libraries
// install libraries before running this app with the following commands:
// npm install twitter, npm install spotify, npm install request
var Twitter = require("twitter");
var Spotify = require("spotify");
var Request = require("request");

// require node built in fs library
var fs = require('fs');

var twitKey = twitKey.twitterKeys;

//var for grabbing index 2 in command line
var input = process.argv[2];

//var for grabbing index 3 in command line
var commando = process.argv[3];

// switch based on the command received
switch (input) {

	case "my-tweets":
		myTweets();
		break;

	case "spotify-this-song":
		mySpotify(commando);
		break;

	case "movie-this":
		movieThis(commando);
		break;

	case "do-what-it-says":
		doWhatItSays();
		break;

	// default response when command is not valid
	default:
		console.log("not a valid entry.");

// end of the switch statement
}

// if the my-tweets command is received create function
function myTweets() {

	// set up object for Twitter access
	var client = new Twitterer({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
	});
};


// if the spotify-this-song command is received
function mySpotify(userSong) {

	// first save the name of the song
	// if it is provided from command line then use that otherwise
	// using ternary function seems to be the easiest way to do this
	var mySong = "San Francisco";

	// run a search on the Spotify API by track name for mySong
	Spotify.search({ type: 'track', query: mySong }, function(err, data, response) {

		// if an error is caught in the call, display that and exit the function
		if (err) return console.log('Spotify Error: ' + err);

		// if the song is not found in the Spotify database, log that and exit the function
		if (data.tracks.items.length == 0) return (console.log('No such song found!'));

		//console logging various items we need
		console.log('Artist Name: ' + data.tracks.items[0].artists[0].name);
		console.log('Song Name: ' + data.tracks.items[0].name);
		console.log('Preview Link: ' + data.tracks.items[0].preview_url);
		console.log('Album Title: ' + data.tracks.items[0].album.name);

	});

}
//end of spotify -- starting omdb

// function movieThis command is received
function movieThis(userMovie) {

	// first save the name of the movie if provided from command line
	// otherwise default to "Mr. and Mrs. Smith"
	var meMovie = "Mr. and Mrs. Smith";

	// Then run a request to the OMDB API with the movie specified + key
	Request("http://www.omdbapi.com/?t=40e9cece" + myMovie + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {

		// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode === 200) {

    		// Parse the returned data (body) and display movie info
    		console.log('Movie Title: ' + JSON.parse(body).Title);
    		console.log('Release Year: ' + JSON.parse(body).Year);
    		console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
    		console.log('Production Country: ' + JSON.parse(body).Country);
    		console.log('Language: ' + JSON.parse(body).Language);
    		console.log('Plot: ' + JSON.parse(body).Plot);
    		console.log('Actors/Actresses: ' + JSON.parse(body).Actors);
    		console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoRating);
    		console.log('Rotten Tomatoes URL: ' + JSON.parse(body).tomatoURL);
  		}

	});

}

	// split data into an array of function name and argument
	var dataObject = data.split(',');

	// define the function name and argument name
	var myFunction = dataObject[0];
	var myArgument = dataObject[1];

	// modify the myFunction received into the function names used in this app
	switch (myFunction) {
		case 'my-tweets':
			myFunction = 'myTweets';
			break;
		case 'spotify-this-song':
			myFunction = 'mySpotify';
			break;
		case 'movie-this':
			myFunction = 'movieThis';
			break;
		default:
			console.log('Unexpected error in doWhatItSays function');
	}