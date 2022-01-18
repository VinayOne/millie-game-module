const mongoose = require("mongoose");

const schema = mongoose.Schema({
	_id: String,
	name: String,
	seasonName: String,
	startDate: Date,
	endDate: Date,
	levels: [{
		alchemerLink: String,
		millies: Number,
		imageLink: String,
		constructLink: String,
		rewards: [{
			name: String,
			imageLink: String
		}]
	}]
});

module.exports = mongoose.model("Game", schema);