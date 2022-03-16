const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const routes = require("./routes");

const app = express();

const url = `mongodb+srv://vinayone:12Ekq1qw9Dh1G5J1@cluster0.5vd7f.mongodb.net/game-module-db?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url,connectionParams)
    .then( () => {
        app.use(cors());
		app.use(bodyParser.json());

		app.use(express.static(path.join(__dirname, "dist", "millie-game-module")));

		app.use("/api", routes);

		app.get('*', (req, res) => {
		  res.sendFile(path.join(__dirname, "dist", "millie-game-module", "index.html"));
		});

		const port = process.env.PORT || 3000;

		const server = app.listen(port, () => console.log(`Listening on port ${port}`));
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });