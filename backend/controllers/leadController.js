const Region = require("../models/krajModel");
const Lead = require("../models/leadModel");

exports.createLead = async (req, res) => {
  const { estateType, firstName, lastName, phone, email, region, district } =
    req.body;

  try {
    // Získání ID regionu podle názvu
    const foundRegion = await Region.findOne({ name: region });
    if (!foundRegion) {
      return res.status(400).json({ error: "Region nebyl nalezen" });
    }

    // Získání ID okresu podle názvu
    const foundDistrict = foundRegion.districts.find(
      (d) => d.name === district
    );
    if (!foundDistrict) {
      return res.status(400).json({ error: "Okres nebyl nalezen" });
    }

    // Vytvoření nového leadu
    const lead = new Lead({
      estateType,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      phone,
      email,
      region: foundRegion._id,
      district: foundDistrict._id,
    });

    await lead.save();
    res.status(201).json({ message: "Lead vytvořen", id: lead._id });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Interní chyba serveru", message: err.message });
  }
};
