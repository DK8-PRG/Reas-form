const express = require("express");
const leadController = require("../controllers/leadController");

const router = express.Router();

router.post("/check", leadController.checkEmailAndPhone);
router.get("/:email", leadController.getLeadByEmail);
router.get("/", leadController.getAllLeads);
router.post("/", leadController.createLead);

module.exports = router;
