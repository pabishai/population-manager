import app from "./app/index";
import databaseConnection from "./app/utils/databaseConnection";
import databaseConfig from "./app/config/database.config";

databaseConnection(databaseConfig.url);

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
