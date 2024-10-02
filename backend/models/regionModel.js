const mongoose = require("mongoose");
const slugify = require("slugify");

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Okres musí mít název"],
  },
});

const regionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Kraj musí mít název"],
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  pathData: {
    type: String,
  },
  labelPosition: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  districts: [districtSchema],
});

// Middleware pro generování slug před uložením dokumentu
regionSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

const Region = mongoose.model("Region", regionSchema);
// const District = mongoose.model("District", districtSchema);

module.exports = Region;
