require( "dotenv" ).config();

const ComfyJS = require( "comfy.js" );
const fs = require( "fs" );
const adjectives = fs.readFileSync( "floofyadj.txt" ).toString().split( "\r\n" ).filter( x => x );
const nouns = fs.readFileSync( "floofynoun.txt" ).toString().split( "\r\n" ).filter( x => x );

function getRandomInt( num ) {
  return Math.floor( num * Math.random() );
}

ComfyJS.onCommand = ( user, command, message ) => {
  if( command === "name" ) {
    var name = adjectives[ getRandomInt( adjectives.length ) ] + " " + nouns[ getRandomInt( nouns.length ) ];
    if( Math.random() < 0.25 ) {
      name = adjectives[ getRandomInt( adjectives.length ) ] + " " + name;
    }
    ComfyJS.Say( "/me @" + user + " " + name );
  }
}
ComfyJS.Init( process.env.TWITCHUSER, process.env.OAUTH );

const ComfyDiscord = require( "comfydiscord" );
ComfyDiscord.onCommand = ( channel, user, command, message, flags, extra ) => {
  // if( channel === "discordbotjam" ) {
    if( command === "name" ) {
      var name = adjectives[ getRandomInt( adjectives.length ) ] + " " + nouns[ getRandomInt( nouns.length ) ];
      if( Math.random() < 0.25 ) {
        name = adjectives[ getRandomInt( adjectives.length ) ] + " " + name;
      }
      ComfyDiscord.Say( channel, "<@" + extra.userId + "> " + name );
    }
  // }
}
ComfyDiscord.Init( process.env.DISCORDTOKEN );
