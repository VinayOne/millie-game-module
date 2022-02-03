const mongoose = require("mongoose");

const schema = mongoose.Schema({
	rank: Number,
	image: String,
	username: String,
	password: String,
	millis: Number,
	interests: [String],
	millis_this_quest: Number,
	puzzles: Number,
	keys: Number,
	items: [String]
});

module.exports = mongoose.model("User", schema);