import express from "express";
import bodyParser from "body-parser";
import locationRoutes from "./app/location/location.routes";
import databaseConnection from "./app/utils/databaseConnection";
import serverErrorMidleware from "./app/middleware/serverError.midleware";

databaseConnection();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/location", locationRoutes, serverErrorMidleware);

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
