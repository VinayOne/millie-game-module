const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: String,
	startLevel: String,
	endLevel: String,
	levelSuccess: Boolean
});

module.exports = mongoose.model("ConstructGame", schema);