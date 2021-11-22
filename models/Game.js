const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: String,
	season: String,
	date: Date,
	levels: [{
		alchLink: String,
		imageLink: String,
		constructLink: String,
		rewards: [String]
	}]
});

module.exports = mongoose.model("Game", schema);