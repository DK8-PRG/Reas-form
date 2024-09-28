const Region = require("../models/krajModel");

exports.getEstateType = async (req, res) => {
  // Vaše logika pro získání typů nemovitostí
};

exports.getRegions = async (req, res) => {
  try {
    const regions = await Region.find().select("name");
    res.status(200).json({
      status: "success",
      data: {
        regions,
      },
    });
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
