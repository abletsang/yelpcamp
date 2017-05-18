var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Maple Hill",
// 	image: "http://www.campsitephotos.com/photo/camp/722/feature_Patagonia_Lake-f2.jpg"
// }, function(err, campground) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(campground);
// 	}
// });

app.get("/", function(req, res) {
	res.render("landingpage");
});

app.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err,campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: campgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
	Campground.create(newCampground, function(err, allcampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("campgrounds");
		}
	});
	
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
});

app.listen(8080, function() {
	console.log("here!");
});