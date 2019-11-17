var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./models/seed");

seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useUnifiedTopology: true, useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.get("/", function (req, res) {
    res.render("landing");
});


app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds: allcampgrounds })


        }
    });
});

app.post('/campgrounds', function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description };
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })



});
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

app.get('/campgrounds/:id', function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, receivedId) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", { Campground: receivedId });
        }
    })
});
app.listen(3000, function () {
    console.log("The yelp camp server has started!");
});