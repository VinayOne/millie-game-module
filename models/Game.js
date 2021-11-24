const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: String,
	seasonName: String,
	startDate: Date,
	endDate: Date,
	levels: [{
		questions: [{
			question: String,
			correct: String,
			answer: [String]
		}],
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