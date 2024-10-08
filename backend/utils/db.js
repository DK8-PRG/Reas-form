const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB je úspěšně připojeno!");
  } catch (err) {
    console.log("Chyba při připojení k databázi:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
