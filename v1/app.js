var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./db/seed");

seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useUnifiedTopology: true, useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");



// Campground.create(
//     {
//         name: "Somewhere 3",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKoCAvkSPeW_z_9QnAfZrRO9tTu-LGgUYNI2Z9nCyBYM5D-c93&s"
//     },


//     function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(campground);
//         }
//     }

// );


// var campgrounds = [
//     { name: "Somewhere 1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKoCAvkSPeW_z_9QnAfZrRO9tTu-LGgUYNI2Z9nCyBYM5D-c93&s" },
//     { name: "Somewhere 2", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdRfkde549MhC5rzki3qUuXgtxVBLq0I2IVm1M1bcGbjNurfRyDA&s" },
//     { name: "Somewhere 3", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjvydTPHkp6p7YLBslNGYwXfUVqLP1UJS03oYsr0lAcsM0ZL5&s" }
// ]

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
    // res.render("campgrounds", { campgrounds: campgrounds })
    //     ;
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
    Campground.findById(req.params.id, function (err, receivedId) {
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