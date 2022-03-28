const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: String,
	seasonName: String,
	startDate: Date,
	endDate: Date,
	constructLink: String,
	levels: [Object],
	finalAlchemerLink: String
});

module.exports = mongoose.model("Game", schema);