const moment = require("moment");
const fs = require('fs');
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");


//BANDS IN TOWN
const searchConcerts = str =>{
  let url = `https://rest.bandsintown.com/artists/${str}/events?app_id=codingbootcamp`;
  axios.get(url).then((response)=>{
    console.log(response.data[0].artist.name);
    console.log(`Playing at ${response.data[0].venue.name}`)
    console.log(`in ${response.data[0].venue.city}`)
    console.log(`on ${moment(response.data[0].datetime).format("L")}`);
  }).catch(error =>{console.error(error)});
}

//SPOTIFY
const searchSpotify = str => {
  spotify.search({ type: 'track', query: str }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  let artist = `Artist: ${data.tracks.items[0].artists[0].name}`;
  let songName = `Song: ${data.tracks.items[0].name}`;
  let album = `Album: ${data.tracks.items[0].album.name}`;
  let songSample = `Link to Song: ${data.tracks.items[0].external_urls.spotify}`;
  console.log(songName);
  console.log(album);
  console.log(artist);
  console.log(songSample);
  });
};

//OMDB
const searchMovies = str =>{
  let url = `http://www.omdbapi.com/?apikey=trilogy&t=${str}`;
  axios.get(url).then((response)=>{
    console.log(`Title: ${response.data.Title}`); // Movie Title
    console.log(`Year: ${response.data.Year}`); // Release Year
    console.log(`IMDB Rating: ${response.data.imdbRating}`); // IMDB rating
    console.log(`RT Rating: ${response.data.Ratings[1].Value}`); // Rotten Tomatoes Rating (N.B. IF ROTTEN TOMATOES DATA IS NOT RETURNED, THIS IS USUALLY A METACRITIC SCORE)
    console.log(`Country: ${response.data.Country}`); // Production Country
    console.log(`Language: ${response.data.Language}`); // Movie Language
    console.log(`Actors: ${response.data.Actors}`); // Movie Actors
    console.log(`Plot Summary: ${response.data.Plot}`); // Movie Plot
  }, (error)=>{
      console.log(error);
  });
}

const rando = () => {
  fs.readFile("random.text", "utf8", (error, data) => {
    if (error) {
      return console.log(error);
    }
    let arr = data.split(",");
    media = arr[1];
    command = arr[0];
    switch (command) {
      case 'searchConcerts':
      {
        searchConcerts(media);
      }
      break;
      case 'searchSpotify':
      {
        searchSpotify(media);
      }
      break;
      case 'searchMovies':
      {
        searchMovies(media);
      }
      break;
    };
  })
};

try{
  let command = process.argv[2].toLowerCase();
  let media = process.argv[3]
  
  switch (command) {
    case 'concert':
    {
      searchConcerts(media);
    }
    break;
    case 'song':
    {
      searchSpotify(media);
    }
    break;
    case 'movie':
    {
      searchMovies(media);
    }
    break;
    case 'random':
    {
      rando();
    }
    break;
  };
}catch(error){
  console.log(error);
  console.log("Invalid entry, required input: 'command-query'");
}