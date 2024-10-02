const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const leadRouter = require("./routes/leadRoutes");
const enumRouter = require("./routes/enumRoutes");

const app = express();

// Middleware pro bezpečnostní hlavičky
app.use(helmet());

// Middleware pro parsování JSON a URL-encoded dat
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pro sanitizaci dat před uložením do databáze
app.use(mongoSanitize());

// Middleware pro ochranu proti XSS útokům
app.use(xss());

// Middleware pro CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.options("*", cors()); // Povolí všechny možnosti pro CORS

// Nahrání routes
app.use("/api/v1/leads", leadRouter);
app.use("/api/v1/enums", enumRouter);

// Middleware pro zpracování neexistující rout
app.all("*", (req, res, next) => {
  const err = new Error(`Neexistující routa ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

// Centrální middleware pro zpracování chyb
app.use((err, req, res) => {
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Interní chyba serveru",
  });
});

module.exports = app;
