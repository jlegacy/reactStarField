// Module dependencies
var express = require('express'),
    http = require('http'), 
    path = require('path'),
	Cookies = require('cookies');

// Create an express app
var app = express();

// Configure an express app
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
	app.use(express.cookieParser('secret'));
	app.use(express.session());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
	app.use('/lib',  express.static(__dirname + '/lib'));
	app.use('/spec',  express.static(__dirname + '/spec'));
	app.use('/src',  express.static(__dirname + '/src'));
	app.use('/build',  express.static(__dirname + '/build'));
	app.use('/shared',  express.static(__dirname + '/shared'));
	app.use('/images',  express.static(__dirname + '/images'));
	app.use('/js',  express.static(__dirname + '/js'));
	app.use('/css',  express.static(__dirname + '/css'));
	app.use('/scripts',  express.static(__dirname + '/scripts')); 
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

// Store "session" information.  To see how to store sessions in a cookie, check out
// https://gist.github.com/visionmedia/1491756
var sessionInfo = {
    name:'Guest'
};

// Create session middleware
var session = function(request, response, next) {
    // TODO: How do we store session data on the request?  How do we continue with the request chain?
	response.cookie('sessionInfo', sessionInfo, { maxAge: 900000, httpOnly: false });
	next();
};

// Handle GET request to root URL
app.get('/', session, function(request, response) {
	  response.sendfile('./views/index.html');
});

app.post('/login', function(request, response) {
    // Update our session state with the undername submitted by the form
    sessionInfo.name = request.body.username;
	response.cookie('sessionInfo', sessionInfo, { maxAge: 900000, httpOnly: false });
	response.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port') + " - visit http://localhost:3000/");
});
