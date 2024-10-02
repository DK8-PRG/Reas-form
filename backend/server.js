const dotenv = require("dotenv");
const connectDB = require("./utils/db");

process.on("uncaughtException", function (err) {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

connectDB();

// const port = process.env.PORT || 3000;

const server = app.listen(8080, "0.0.0.0", () => {
  console.log(`App běží na portu 8080...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
