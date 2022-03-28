const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("./models/User");
const Game = require("./models/Game");
const CG = require("./models/ConstructGame");

const axios = require('axios');
const baseUrl = 'http://18.118.169.0:5000';
const userData = '';


function verifyToken(req, res, next) {
	if (!req.headers.authorization)
		return res.status(401).send("Unauthorized access");

	let token = req.headers.authorization.split(" ")[1];

	if (token === "null")
		return res.status(401).send("Unauthorized access");

	let payload = jwt.verify(token, 'secretkey');

	if (!payload)
		return res.status(401).send("Unauthorized access");

	req.userId = payload.subject;
	next();
}

router.post("/login", (req, res) => {
	const loginData = req.body;

	User.findOne({ username: loginData.username }, (error, user) => {
		if (error)
			console.log(error);
		else {
			if (!user)
				res.status(401).send("Invalid username");
			else if (user.password != loginData.password)
				res.status(401).send("Invalid password");
			else {
				const payload = { subject: user.username };
				const token = jwt.sign(payload, 'secretkey');
				res.status(200).send({token, user});
			}
		}
	});
});

accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiI2MWRkZGEyZWNhYTcxYjBlYTk4Zjc0MTAiLCJleHBpcmVzSW4iOiIzMGQiLCJwcm9maWxlVHlwZSI6ImdhbWUiLCJpYXQiOjE2NDYxMzExOTcsImV4cCI6MTY0ODcyMzE5N30.GwmZNf8oeY5Om2c_KSB6q4p7UKD8nbUdzhJSTG46mwA`;
adminAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiI2MTJkZDJlMTk4MzcwNDFmZDMwZTIxMzAiLCJleHBpcmVzSW4iOiIzMGQiLCJwcm9maWxlVHlwZSI6ImdhbWUtYWRtaW4iLCJpYXQiOjE2NDI1MTQ3MTEsImV4cCI6MTY0NTEwNjcxMX0.yOhHNyh-piBI33udN4qvo-ND2xlQWt920x4RrwYnTfA`;

router.get("/user-detail", async (req, res) => {
	let data = '';
	var config = {
	  method: 'get',
	  url: `${baseUrl}/api/v1/user/game/user-detail`,
	  headers: { 
	    'accessToken': accessToken
	  },
	  data : data
	};

	axios(config)
	.then(function (response) {
	  res.status(200).send(JSON.stringify(response.data));
	})
	.catch(function (error) {
	  res.status(404).send(error);
	});
});

router.get("/leaderboard-users/:pageCount/:interestId/:page", async (req, res) => {
	let data = '';
	var config = {
	  method: 'get',
	  url: `${baseUrl}/api/v1/leaderboard/game-rank?type=currentSeason&pageCount=${req.params.pageCount}&interestId=${req.params.interestId}&page=${req.params.page}`,
	  headers: { 
	    'accessToken': accessToken
	  },
	  data : data
	};

	axios(config)
	.then(function (response) {
	  res.status(200).send(JSON.stringify(response.data)).set(userData, JSON.stringify(response.data));
	})
	.catch(function (error) {
	  res.status(404).send(error);
	});
});

router.get("/users/:username", async (req, res) => {
	const user = await User.findOne({ username: req.params.username });
	res.status(200).send(user);
});

router.get("/users", async (req, res) => {
	const users = await User.find();
	res.status(200).send(users);
});

router.get("/game/current", (req, res) => {
	// look up game where current date comes after start date AND current date comes before end date
	Game.findOne({endDate:{$gte: new Date()},startDate:{$lte: new Date()}}, (error, data) => {
		if (error) {
			console.log(error)
		} else {
			if (!data) {
				res.status(403).send("No game found!");
			} else {
				res.status(200).send(data);
			}
		}
	});
});

router.get("/game/:id", async (req, res) => {
	Game.findById(req.params.id, async (error, game) => {
		if (error)
			console.log(error);
		else {
			if (!game)
				res.status(403).send("Invalid game ID");
			else
				res.status(200).send(game);
		}
	});	
});

router.get("/games", async (req, res) => {
	const games = await Game.find({});
	res.status(200).send(games);
});

router.put("/game/:id", async (req, res) => {
	start = `${req.body.startDate.year}-${req.body.startDate.month}-${req.body.startDate.day}`;
	end = `${req.body.endDate.year}-${req.body.endDate.month}-${req.body.endDate.day}`;

	console.log(req.body);

	const game = await Game.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
		seasonName: req.body.seasonName,
		startDate: start,
		endDate: end,
		constructLink: req.body.constructLink,
		levels: req.body.levels,
		finalAlchemerLink: req.body.finalAlchemerLink
	});
	res.status(200).send(game);
});

router.post("/game", async (req, res) => {
	start = `${req.body.startDate.year}-${req.body.startDate.month}-${req.body.startDate.day}`;
	end = `${req.body.endDate.year}-${req.body.endDate.month}-${req.body.endDate.day}`;

	const game = new Game({
		name: req.body.name,
		seasonName: req.body.seasonName,
		startDate: start,
		endDate: end,
		constructLink: req.body.constructLink,
		levels: req.body.levels,
		finalAlchemerLink: req.body.finalAlchemerLink
	});

	await game.save();
	res.status(200).send(game);
});

router.delete("/game/:id", async (req, res) => {
	const game = await Game.findByIdAndRemove(req.params.id);
	res.status(200).send(game);
});

router.route('/creategameuser').post((req, res, next) => {
	CG.create(req.body, (error, data) => {
		if(error) {
			return next(error)
		} else {
			res.json(data)
		}
	})
});

router.route('/getgameusers').get((req, res, next) => {
	CG.find((error, data) => {
		if(error) {
			return next(error)
		} else {
			res.json(data)
		}
	}) 
});

router.route('/getgameuser/:id').get((req, res, next) => {
	CG.findById(req.params.id, (error, data) => {
		if(error) {
			return next(error)
		} else {
			res.json(data)
		}
	})
});

router.route('/updategameuser/:id').put((req, res, next) => {
	CG.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => {
		if(error) {
			return next(error)
		} else {
			res.json(data);
			console.log('Updated Successfuly!');
		}
	})
});

router.route('/deletegameuser/:id').delete((req, res, next) => {
	CG.findByIdAndRemove(req.params.id, (error, data) => {
		if(error) {
			return next(error)
		} else {
			res.status(200).json({
				'msg' : data
			})
		}
	})
});

router.route('/currentUserId').get((req, res, next) => {
	//const currentEmail = currentUserEmail.result.email;
	//console.log('userData > ', userData);
	CG.findOne({email : 'spiderman@gmail.com'}, (error, data) => {
		if(error) {
			return next(error)
		} else {
			res.send(data);
		}
	})
});

module.exports = router;