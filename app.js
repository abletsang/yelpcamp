var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landingpage");
});

app.get("/campgrounds", function(req, res) {
	res.render("campgrounds");
});

app.listen(8080, function() {
	console.log("here!");
});