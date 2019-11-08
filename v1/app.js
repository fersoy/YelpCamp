var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgrounds = [
    { name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKoCAvkSPeW_z_9QnAfZrRO9tTu-LGgUYNI2Z9nCyBYM5D-c93&s" },
    { name: "Smoky Mountains", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdRfkde549MhC5rzki3qUuXgtxVBLq0I2IVm1M1bcGbjNurfRyDA&s" },
    { name: "Yellow Stone", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjvydTPHkp6p7YLBslNGYwXfUVqLP1UJS03oYsr0lAcsM0ZL5&s" }
]

app.get("/", function (req, res) {
    res.render("landing");
});


app.get("/campgrounds", function (req, res) {

    res.render("campgrounds", { campgrounds: campgrounds })
        ;
});

app.post('/campgrounds', function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image };
    campgrounds.push(newCampground);

    res.redirect("/campgrounds");

});
app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});

app.listen(3000, function () {
    console.log("The yelp camp server has started!");
});