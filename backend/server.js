const app = require("./app");
const connectDatabase = require("./db/Database");

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`err ${err.message}`);
  console.log("shutting down server for handling uncaught exceptions");
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

//connect db
connectDatabase();

//create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down server for ${err.message}`);
  console.log(`shutting down the server fr unhandled rejection`);

  server.close(() => {
    process.exit(1);
  });
});
