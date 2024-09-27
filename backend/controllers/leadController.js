const Lead = require("../models/leadModel");
const { validationResult } = require("express-validator");

exports.createLead = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { estateType, fullName, phone, email, region, district } = req.body;

  try {
    const lead = new Lead({
      estateType,
      fullName,
      phone,
      email,
      region,
      district,
    });
    await lead.save();
    res.status(201).json({ message: "Lead vytvořen", id: lead._id });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Interní chyba serveru", message: err.message });
  }
};
