export interface Game {
	name: String,
	seasonName: String,
	startDate: any,
	endDate: any,
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
}