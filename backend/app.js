const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const leadRouter = require("./routes/leadRoutes");
const enumRouter = require("./routes/enumRoutes");

const app = express();

// middleware pro nastavení bezpečnostích hlaviček
app.use(helmet());
// middleware pro parsování JSON a URL-encoded dat
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware pro sanitizaci dat před uložení do databáze
app.use(mongoSanitize());

// middleware pro omezení nežádoucích zprávy
app.use(xss());
// middleware pro CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.options("*", cors());
// nahrání routes
app.use("/api/v1/leads", leadRouter);
app.use("/api/v1/enums", enumRouter);

// middleware pro zpracování neexistující rout
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `neexistující rout ${req.originalUrl}`,
  });
});

module.exports = app;
