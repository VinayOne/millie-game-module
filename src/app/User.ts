export interface User {
	rank?: number,
	image: string,
	username: string,
	password?: string,
	millis: number,
	interests: string[],
	millis_this_quest?: number,
	puzzles?: number,
	keys?: number,
	items?: string[]
}