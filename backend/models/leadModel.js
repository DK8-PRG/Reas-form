const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  estateType: {
    type: String,
    enum: ["Byt", "Pozemek", "Celý dům"],
    required: [true, "Vyberte typ nemovitosti"],
  },
  fullName: {
    type: String,
    required: [true, "Zadejte Vaše jméno"],
    minlength: [2, "Jméno musí mít alespoň 2 znaky"],
    maxlength: [50, "Jméno nesmí být delší než 50 znaků"],
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Zadejte Váš telefonní číslo"],
    match: [
      /^\+?(420|421)?\d{9}$/,
      "Telefonní číslo musí být ve formátu +420xxxxxxxxx, 420xxxxxxxxx, +421xxxxxxxxx nebo 421xxxxxxxxx",
    ],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Zadejte Váš email"],
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Email musí být ve formátu nekdo@neco.tam",
    ],
    unique: true,
  },
  region: {
    type: String,
    enum: [
      "Hlavní město Praha",
      "Středočeský kraj",
      "Jihočeský kraj",
      "Plzeňský kraj",
      "Karlovarský kraj",
      "Ústecký kraj",
      "Liberecký kraj",
      "Královéhradecký kraj",
      "Pardubický kraj",
      "Kraj Vysočina",
      "Jihomoravský kraj",
      "Olomoucký kraj",
      "Zlínský kraj",
      "Moravskoslezský kraj",
    ],
    required: [true, "Vyberte kraj"],
  },
  district: {
    type: String,
    required: [true, "Vyberte okres"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Lead = mongoose.model("lead", leadSchema);

module.exports = Lead;
