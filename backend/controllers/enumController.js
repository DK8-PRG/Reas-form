const Region = require("../models/regionModel");
const Lead = require("../models/leadModel");

exports.getEstateType = async (req, res) => {
  try {
    // Získání enum hodnot z Lead schématu
    const estateTypes = Lead.schema.path("estateType").enumValues;

    res.status(200).json({
      status: "success",
      data: estateTypes,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    res.status(200).json({
      status: "success",
      data: {
        regions,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getDistrictsByRegion = async (req, res) => {
  try {
    const region = await Region.findOne({ slug: req.params.slug });
    if (!region) {
      return res.status(404).json({
        status: "fail",
        message: "Region nenalezen",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        districts: region.districts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
