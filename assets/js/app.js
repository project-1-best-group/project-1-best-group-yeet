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