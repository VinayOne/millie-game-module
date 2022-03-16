const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: String,
	startLevel: String,
	endLevel: String,
	date: Date
});

module.exports = mongoose.model("ConstructGame", schema);