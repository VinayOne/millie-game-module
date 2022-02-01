const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("./models/User");
const Game = require("./models/Game");

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

accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiI2MTVkNGNkYTk2ZGUwODc1ZGE2MjQxOTMiLCJleHBpcmVzSW4iOiIzMGQiLCJwcm9maWxlVHlwZSI6ImdhbWUiLCJpYXQiOjE2NDI1MTM4NjQsImV4cCI6MTY0NTEwNTg2NH0._5UnEmDnCTC-2cM1RkDDOn6qnKwGP5x0naQ8FYRvPkc`;
adminAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiI2MTJkZDJlMTk4MzcwNDFmZDMwZTIxMzAiLCJleHBpcmVzSW4iOiIzMGQiLCJwcm9maWxlVHlwZSI6ImdhbWUtYWRtaW4iLCJpYXQiOjE2NDI1MTQ3MTEsImV4cCI6MTY0NTEwNjcxMX0.yOhHNyh-piBI33udN4qvo-ND2xlQWt920x4RrwYnTfA`;

router.get("/user-detail", async (req, res) => {
	var axios = require('axios');
	var data = '';

	var config = {
	  method: 'get',
	  url: 'http://18.118.169.0:5000/api/v1/user/game/user-detail',
	  headers: { 
	    'accessToken': adminAccessToken
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

router.get("/users/:username", async (req, res) => {
	const user = await User.findOne({ username: req.params.username });
	res.status(200).send(user);
});

router.get("/users", async (req, res) => {
	const users = await User.find();
	res.status(200).send(users);
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
		levels: req.body.levels
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
		levels: req.body.levels
	});

	await game.save();
	res.status(200).send(game);
});

router.delete("/game/:id", async (req, res) => {
	const game = await Game.findByIdAndRemove(req.params.id);
	res.status(200).send(game);
});

module.exports = router;