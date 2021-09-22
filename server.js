const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const routes = require("./routes");

const app = express();

const url = `mongodb+srv://brandon123:z7DIKPJ41b6SBq7q@cluster0.bg91i.mongodb.net/game-module-db?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url,connectionParams)
    .then( () => {
        app.use(cors());
		app.use(bodyParser.json());

		app.use(express.static(path.join(__dirname, "src")));

		app.use("/api", routes);

		app.get('', (req, res) => {
		  res.sendFile(path.join(__dirname, "src", "index.html"));
		});

		app.get('/', (req, res) => {
		  res.sendFile(path.join(__dirname, "src", "index.html"));
		});

		const port = process.env.PORT || 3000;

		const server = app.listen(port, () => console.log(`Listening on port ${port}`));
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });