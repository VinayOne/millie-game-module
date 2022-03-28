const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: String,
	startLevel: String,
	endLevel: String,
	levelSuccess: Boolean,
	email: String,
	millis: String
});

module.exports = mongoose.model("ConstructGame", schema);