import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import express from "express";
import bodyParser from "body-parser";
import locationRoutes from "./location/location.routes";
import serverErrorMidleware from "./middleware/serverError.midleware";

const app = express();

const swaggerDocument = YAML.load("./swagger.yml");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/location", locationRoutes, serverErrorMidleware);

export default app;
