const mongoose = require("mongoose");
const { validateEmail, validatePhone } = require("../utils/validation");

const leadSchema = new mongoose.Schema({
  estateType: {
    type: String,
    enum: ["Byt", "Pozemek", "Celý dům"],
    required: [true, "Vyberte typ nemovitosti"],
  },
  firstName: {
    type: String,
    required: [true, "Zadejte Vaše jméno"],
    minlength: [2, "Jméno musí mít alespoň 2 znaky"],
    maxlength: [50, "Jméno nesmí být delší než 50 znaků"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Zadejte Vaše příjmení"],
    minlength: [2, "Příjmení musí mít alespoň 2 znaky"],
    maxlength: [50, "Příjmení nesmí být delší než 50 znaků"],
    trim: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Zadejte Vaše telefonní číslo"],
    validate: {
      validator: validatePhone,
      message:
        "Telefonní číslo musí být ve formátu +420xxxxxxxxx, 420xxxxxxxxx, +421xxxxxxxxx nebo 421xxxxxxxxx",
    },
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Zadejte Váš email"],
    validate: {
      validator: validateEmail,
      message: "Email musí být ve formátu nekdo@neco.tam",
    },
    unique: true,
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
    required: [true, "Vyberte kraj"],
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "District",
    required: [true, "Vyberte okres"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
