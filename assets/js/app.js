//----------TWITCH API-------------

/*The twitch API will require 2 separate API calls. You need to find the game ID based on the game searched by the user, and once you have that ID, you need to make a second call in order to grab the streamers for that game. */

//API Client ID for twitch. This lets twitch identify our application
var twitchKey = "j14eing3pnpaqymo51m1hdbcrvsveb";

//The API endpoint for grabbing the gameID searched by the user
var twitchGameURL = "https://api.twitch.tv/helix/games"

//The user in the search bar will be stored in variable searchTerm, for now the test variable is set to hearthstone
var searchTerm = "Hearthstone";

//The gameURL combines the above parameters and builds the link to be passed into AJAX to return the game ID
var gameURL = `${twitchGameURL}?name=${searchTerm}`;

//The API endpoint for grabbing streams
var twitchStreamURL = "https://api.twitch.tv/helix/streams";

//The number of streams to return
var limit = 5;

//Twitch API Call for the Game ID searches the game entered by the user and stores the game ID in the gameID variable
$.ajax({
    url: gameURL,
    method: "GET",
    headers: {"Client-ID": twitchKey}
}).then(function(response){
    var gameID = (response.data[0].id);
    getStreams(gameID);
});

//Twitch API Call for Streams must execute AFTER the request for the game ID, or else it wont have an ID to search for
function getStreams(ID){

    //The streamURL uses the game ID from the first AJAX request to build the queryURL for streams
    var streamURL = `${twitchStreamURL}?game_id=${ID}&first=${limit}`;

    $.ajax({
        url: streamURL,
        method: "GET",
        headers: {"Client-ID": twitchKey}
    }).then(function(response){
        response.data.forEach(e => {
            console.log(e);
            var width = e.thumbnail_url.replace("{width}", "150");
            var pic = width.replace("{height}", "100");
            $("#twitch-streamer-container").append(`
            <div class="stream">
                <p>${e.title}</p>
                <img class="img-responsive" src=${pic}>
            </div>`);
        });
    });
}