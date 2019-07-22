import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Easy Census. We make it easy to do a census"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
