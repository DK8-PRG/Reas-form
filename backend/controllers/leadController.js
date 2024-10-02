const leadService = require("../services/leadService");

exports.checkEmailAndPhone = async (req, res) => {
  try {
    const existingLead = await leadService.isEmailOrPhoneExisting(req.body);
    if (existingLead) {
      return res
        .status(200)
        .json({ exists: true, message: "Email nebo telefon již existují" });
    }
    return res
      .status(200)
      .json({ exists: false, message: "Email a telefon jsou volné" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getLeadByEmail = async (req, res) => {
  try {
    const lead = await leadService.getLeadByEmail(req.params.email);
    return res.status(200).json({ data: lead });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await leadService.getAllLeads();
    return res.status(200).json({ data: leads });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.createLead = async (req, res) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json({ message: "Lead vytvořen", id: lead._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
