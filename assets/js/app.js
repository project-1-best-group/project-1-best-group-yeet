// Adding click event listen listener to all buttons
// $("button").on("click", function () {
    // Grabbing and storing the top-games property value from the button
    var topGames = $(this).attr("top-games");

    // Constructing a queryURL using the top games
    var queryURL = "https://api-endpoint.igdb.com" +
        topGames + "&api_key=62525f6cf8123afff58784c088d6f41a";

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var gamesDiv = $("<div>");
                console.log(results[i]);
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Top 5 Games: " + results[i].rating);

                // Creating and storing an image tag
                var gamesImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                gamesImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the showsDiv
                gamesDiv.append(p);
                gamesDiv.append(gamesImage);
            }
        });
// });