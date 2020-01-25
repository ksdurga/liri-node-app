// const moment = require("moment");
const fs = require('fs');
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
let currentDay = "2020-01-25";
let oneWeek = "2020-02-01";
//BANDS IN TOWN
const searchConcerts = (query)=>{
  let url = `https://rest.bandsintown.com/artists/${query}/events?app_id=codingbootcamp&date=${currentDay}%2C${oneWeek}`;
  axios.get(url).then((response)=>{
      console.log(response.data[0]);
  }).catch(error =>{console.error(error)});
}
//SPOTIFY
const searchSpotify = (str) => {
  spotify.search({ type: 'track', query: str }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  let artist = (data.tracks.items[0].artists[0].name);
  let songName = data.tracks.items[0].name;
  let album = data.tracks.items[0].album.name;
  let songSample = (data.tracks.items[0].external_urls.spotify);
  console.log(songName);
  console.log(album);
  console.log(artist);
  console.log(songSample);
  });
};
//OMDB
const searchMovies = (query)=>{
  let url = `http://www.omdbapi.com/?apikey=[trilogy]&`;
  axios.get(url).then((response)=>{
      console.log(response.request);
  }, (error)=>{
      console.log(error);
  });
}
if (process.argv.length > 2) {
  try{
    let command = process.argv[2].toLowerCase();
    let media = ""
    for(i=3; i<process.argv.length; i++){
      media+= process.argv[i].toLowerCase()+" ";
    }
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
        console.log('film');
      }
      break;
      case 'random':
      {
        console.log('hmm');
      }
      break;
    };
  }catch(error){
    console.log(error);
    console.log("Invalid entry, required input: 'command-query'");
  }
}else{console.log("Invalid Entry")};