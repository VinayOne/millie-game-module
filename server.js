const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

const url = `mongodb+srv://brandon123:z7DIKPJ41b6SBq7q@cluster0.bg91i.mongodb.net/game-module-db?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ');

        app.use(cors());
		app.use(bodyParser.json());

		app.use("/api", routes);

		const server = app.listen(3000, () => console.log("Listening on port 3000"));
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });