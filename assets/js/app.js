//----------TWITCH API-------------
/*The twitch API will require 2 separate API calls. You need to find the game ID based on the game searched by the user, and once you have that ID, you need to make a second call in order to grab the streamers for that game. */

//API Client ID for twitch. This lets twitch identify our application
var twitchKey = "j14eing3pnpaqymo51m1hdbcrvsveb";

//The API endpoint for grabbing the gameID searched by the user
var twitchGameURL = "https://api.twitch.tv/helix/games";

//The API endpoint for grabbing streams
var twitchStreamURL = "https://api.twitch.tv/helix/streams";

//The number of streams to return
var limit = 5;

//Twitch API Call for the Game ID searches the game entered by the user and stores the game ID in the gameID variable
function searchStreams(game){

    //The gameURL combines the twitch game URL with the user search
    var gameURL = `${twitchGameURL}?name=${game}`;

    $.ajax({
        url: gameURL,
        method: "GET",
        headers: {"Client-ID": twitchKey} //Needed for authentication
    }).then(function(response){
        var gameID = (response.data[0].id);
        getStreams(gameID);
    });
}

//Twitch API Call for Streams must execute AFTER the request for the game ID, or else it wont have an ID to search for
function getStreams(ID){

    //The streamURL uses the game ID from the first AJAX request to build the queryURL for streams
    var streamURL = `${twitchStreamURL}?game_id=${ID}&first=${limit}`;

    $.ajax({
        url: streamURL,
        method: "GET",
        headers: {"Client-ID": twitchKey}
    }).then(function(response){
        console.log(response);
        $("#twitch-streamer-container").empty(); 
        if (response.data.length == 0){ // what to do if there are no streams for the entered game
            $("#twitch-streamer-container").append(`
            <h2>Rip in pieces, no one is streaming this game right now </h2>
            `);
        }
        response.data.forEach(e => {
            var width = e.thumbnail_url.replace("{width}", "150");
            var pic = width.replace("{height}", "100");
            $("#twitch-streamer-container").append(`
            <div class="stream">
                <p>${e.title}</p>
                <a href=${twitchLinks(e.thumbnail_url)} target="_blank"><img class="img-responsive" src=${pic}></a>
            </div>`);
        });
        
    });
}

/* When the user clicks on the stream thumbnail, they are redirected to twtich.tv. This method for obtaining the url without another api call was shamelessly stolen from a guy on the twitch developers forum */
function twitchLinks(user){
    var begin = user.indexOf('live_user_') + 10; 
    var end = user.lastIndexOf('-\{width\}');
    var username = user.slice(begin, end);
    var url = 'https://www.twitch.tv/' + username;
    return url;
}

//-------MAIN--------
// Grabbing and storing the top-games property value from the button
var topGames = $(this).attr("top-games");

// Constructing a queryURL using the top games
var queryURL = "https://api-endpoint.igdb.com/games/?fields=name,popularity&order=popularity:desc&limit=5"

var proxy = 'https://cors-anywhere.herokuapp.com/';

// Performing an AJAX request with the queryURL
$.ajax({
        url: proxy + queryURL,
        method: "GET",
        headers: {
            "user-key": "62525f6cf8123afff58784c088d6f41a"
        }
    })
    // After data comes back from the request
    .then(function (response) {
        console.log(response);

        //Lines 21-31 are an alternate to the for map function below
        //Lines 22-26 are an arrow function with for each array method.
        // response.forEach(game => {
        //     console.log(game)
        //     $("#topGames").append(game.name);
        // });

        // for (var i = 0; i < response.length; i++) {
        //     console.log(response[i].name)
        //     $('#orderedGames').append(`<li><a href=${response[i].url}>${response[i].name}</a></li>`);
        // };

        response.map(function(val){
            return $('#orderedGames').append(`<li>${val.name}</li>`);
        })


    });

//---- connecting button to search bar ---
$('#search').on("click", function() {
    event.preventDefault();
    userInput= $("#searchTitle").val().trim();
    searchStreams(userInput);
    })
    
