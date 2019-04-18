var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");



var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// exphbs !!!!!!!!!!!!!!!!
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

//  BORROWED FROM IN CLASS EXERCISES
// A GET route for scraping the planetrock website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.planetrock.com/news/rock-news/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every gm-sec-title within an article tag, and do the following:
      $("a.gm-sec-title").each(function(i, element) {
        // Save an empty result object
        var result = [];
        var article = $(element).text();
        console.log(article);
      });
    });
    res.send("scraping...");
});

app.get("/", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.planetrock.com/news/rock-news/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every gm-sec-title within an article tag, and do the following:
      $("p.gm-sec-description").each(function(i, element) {
        // Save an empty result object
        var result = [];
        var article = $(element).text();
        console.log(article);
      });
    });
    res.send("scraping...");
});




  

  
  
  
  // Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});