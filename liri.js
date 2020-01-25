// const moment = require("moment");
const axios = require("axios");
const fs = require('fs');
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

console.log(spotify);



if (process.argv.length > 2) {



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
  // console.log(data.tracks.items[0]); 
  });
};

// searchSpotify(media);
// axios
//   .get(``)
//   .then(function(res) {
//     console.log(res.data);
//   });

function searchConcert(media) {
  axios
  .get(
    `https://rest.bandsintown.com/artists/${media}/events?app_id=codingbootcamp`
  )
  .then(function(response) {
    console.log(response); // Venue Name
    // console.log(response.data[0].venue.city); // Venue City
  })
  .catch(function(error) {
    console.log(error);
  });
}

try{
  let command = process.argv[2].toLowerCase();
  let media = ""
  for(i=3; i<process.argv.length; i++){
  media+= process.argv[i].toLowerCase()+" ";
  }
// for (i=3; i<process.argv.length; i++) {
//   media += process.argv[i];
//   console.log(media);
// };
switch (command) {
  case 'concert':
  {
    searchConcert(media);
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