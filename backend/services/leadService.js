const Lead = require("../models/leadModel");
const Region = require("../models/regionModel");

exports.isEmailOrPhoneExisting = async ({ email, phone }) => {
  return await Lead.findOne({
    $or: [{ email }, { phone }],
  });
};

exports.createLead = async ({
  estateType,
  firstName,
  lastName,
  phone,
  email,
  region,
  district,
}) => {
  try {
    // Zjištění kraje a okresu
    const foundRegion = await Region.findOne({ name: region });
    if (!foundRegion) throw new Error("Region nebyl nalezen");

    const foundDistrict = foundRegion.districts.find(
      (d) => d.name === district
    );
    if (!foundDistrict) throw new Error("Okres nebyl nalezen");

    // Vytvoření nového leadu
    return await Lead.create({
      estateType,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      phone,
      email,
      region: foundRegion._id,
      district: foundDistrict._id,
    });
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyValue.email) {
        throw new Error("Tento email je již zaregistrován.");
      } else if (error.keyValue.phone) {
        throw new Error("Toto telefonní číslo je již zaregistrováno.");
      }
    }

    throw error;
  }
};

exports.getLeadByEmail = async (email) => {
  const lead = await Lead.findOne({ email }).populate(
    "region",
    "name districts"
  );

  if (!lead) {
    throw new Error("Lead nebyl nalezen");
  }

  return {
    _id: lead._id,
    estateType: lead.estateType,
    firstName: lead.firstName,
    lastName: lead.lastName,
    fullName: lead.fullName,
    phone: lead.phone,
    email: lead.email,
    region: lead.region.name,
    district:
      lead.region.districts.find((d) => d._id.equals(lead.district))?.name ||
      null,
    createdAt: lead.createdAt,
    __v: lead.__v,
  };
};

exports.getAllLeads = async () => {
  // Najdeme všechny leady
  const leads = await Lead.find();

  // Iterujeme přes všechny leady a kontrolujeme region a district
  const populatedLeads = await Promise.all(
    leads.map(async (lead) => {
      if (lead.region) {
        await lead.populate({
          path: "region",
          select: "name districts",
        });
        // Najdeme okres podle ID v regionu
        const foundDistrict = lead.region?.districts
          ? lead.region.districts.find((d) => d._id.equals(lead.district))
          : null;

        // Vracíme populované údaje
        return {
          _id: lead._id,
          estateType: lead.estateType,
          firstName: lead.firstName,
          lastName: lead.lastName,
          fullName: lead.fullName,
          phone: lead.phone,
          email: lead.email,
          region: lead.region || "Nezadáno",
          district: foundDistrict ? foundDistrict : "Nezadáno",
          createdAt: lead.createdAt,
          __v: lead.__v,
        };
      } else {
        return lead;
      }
    })
  );
  return populatedLeads;
};
