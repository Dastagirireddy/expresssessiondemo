var express = require('express'),
	join = require('path').join,
	session = require('express-session'),
	bodyParser = require('body-parser');

var app,
	root;

var users = [{
	email: 'dasta@gmail.com',
	password: 'dasta99'
}, {
	email: 'test@gmail.com',
	password: 'test'
}];

app = express();
root = __dirname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(session({
	name: '__analytic',
	secret: 'keyboard cat'
}));

app.use(express.static(root));

app.post('/login', function(req, res, next){

	if(req.session && !req.session.user) {

		var len = users.length;

		for(var i=0;i<len;i++) {

			if(req.body.email === users[i].email && req.body.password === users[i].password) {

				if(req.body.remember === true) {

					req.session.cookie.maxAge = 50000;
				}
				req.session.user = users[i].email;
			}
		}
	}

	res.json({
		user: req.session.user
	});
});

function requiredLogin(req, res, next) {

	console.log(req.session.user);

	if(req.session && req.session.user) {

		next();
	} else {

		res.statusCode = 403;
	}
}

app.get('/active', requiredLogin, function(req, res) {

	console.log("session available");

	res.json({
		user: req.session.user
	});
});

app.get('/logout', requiredLogin, function(req, res){

	req.session.destroy(function(err) {
	  
	  console.log("Logged out successfully,..");
	  
	  res.json({
	  	message: "Logged out successfully,.."
	  });

	});
});

app.listen(3000, function(){

	console.log("Access your website at http://localhost:3000");
});



