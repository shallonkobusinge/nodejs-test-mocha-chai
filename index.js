
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
const cors = require("cors");
let port = 8080;
let config = require('config'); //we load the db location from the JSON files

//db connection      
try {
    mongoose.connect(config.DBHost, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("Connection to the database is established")
} catch (e) {
    console.error(e);
    process.exit(1);
}



//parse application/json and look for raw text                                        
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

app.get("/", (req, res) => res.json({ message: "Welcome to our Testing!" }));
require("./src/routes/token.route.js")(app); // token routes 

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing