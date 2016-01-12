
/**
 * Module dependencies.
 */


module.exports = function(db){
	var express = require('express');
	var routes = require('./routes')(db);
	var path = require('path');
	var app = express();

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());

	app.use(function (req, res, next) {
		var allowedOrigins = ['http://localhost:8080', 'null'];
		  var origin = req.headers.origin;
		  if(allowedOrigins.indexOf(origin) > -1){
		       res.setHeader('Access-Control-Allow-Origin', origin);
		  }
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	    res.setHeader('Access-Control-Allow-Credentials', true);
	  
	    next();
	   
	});
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
	// TOP 10 USERS BY # FOLLOWERS
	app.get('/api/user/topten', routes.get_top_ten_users_by_followers);
	// TOP 10 USERS BY # REPO OWNED by # USER TYPE [User/Organization]
	app.get('/api/user/toprepo/:user_type', routes.get_top_ten_users_by_repo_owned);
	// TOP 10 REPOS BY # WATCHERS by # USER TYPE [User/Organization] BY [watchers,forks]
	app.get('/api/repo/:user_type/:by', routes.get_top_ten_repo_by_watchers_and_forks);
	// Contributions by Month by # EVENT TYPE 
	app.get('/api/contri/month/:event_type', routes.get_contributions_by_month);
	// Top contributors by share of events
	app.get('/api/contri/share', routes.get_contributions_by_share_events);
	// Top 5 repos by number of forks
	app.get('/api/repo/forks', routes.get_repos_by_forks);
	// Most popular languages used
	app.get('/api/languages', routes.get_popular_languages);
	// Word Count
	app.get('/api/wordcount', routes.get_word_count);
	// Reach VS Uniqueness
	app.get('/api/reach',routes.get_reach);
	return app;
};

