const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", function (err) {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "_PASSWORD_",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB je úspěšně připojeno!"))
  .catch((err) => console.log("Chyba při připojení k databázi:", err));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App běží na portu ${port}...`);
});

process.on("unhadledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
