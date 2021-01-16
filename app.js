var express		= require("express"),
		app 	= express(),
 bodyParser  	= require("body-parser"),
   mongoose 	= require("mongoose"),
	flash 		= require("connect-flash"),
	passport 	= require("passport"),
LocalStrategy	= require("passport-local"),
methodOverride  = require("method-override"),
Campground		= require("./models/campground"),
Comment			= require("./models/comment"),
User			= require("./models/user"),
seedDB			= require("./seeds")
// seedDB(); seed the database

var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index")

//Passport configuration 
app.use(flash());
app.use(require("express-session")({
	secret: "Rusty the best dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

mongoose.set('useUnifiedTopology', true);
//mongodb://localhost/Yelp_Camp_v12
//mongodb+srv://marcel-gola:kubusX3456@yelpcamp.3dakb.mongodb.net/test
mongoose.connect("mongodb+srv://marcel-gola:kubusX3456@yelpcamp.3dakb.mongodb.net/test", { useNewUrlParser: true } );
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));



app.use(function(req, res, next){
   res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
const port = process.env.PORT || 3000;

app.listen(port, () => { 
  console.log('Serving on port ${port}');
});

/*
app.listen(3000, function() { 
  console.log("The Yelp Camp Server Just Started");
});

*/