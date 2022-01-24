export interface Game {
	_id?: any,
	name: String,
	seasonName: String,
	startDate: any,
	endDate: any,
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
}