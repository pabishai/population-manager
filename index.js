import dotenv from "dotenv";
import app from "./app/index";
import databaseConnection from "./app/utils/databaseConnection";

dotenv.config();

databaseConnection(process.env.MONGODB_URI);

// listen for requests
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on port 3000");
});
