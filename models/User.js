const mongoose = require("mongoose");

const schema = mongoose.Schema({
	rank: Number,
	image: String,
	username: String,
	password: String,
	millies: Number,
	interests: [String],
	millies_this_quest: Number,
	puzzles: Number,
	keys: Number,
	items: [String]
});

module.exports = mongoose.model("User", schema);