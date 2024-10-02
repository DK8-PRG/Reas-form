const express = require("express");
const enumController = require("../controllers/enumController");

const router = express.Router();

router.route("/typ-nemovitosti").get(enumController.getEstateType);
router.route("/kraje").get(enumController.getRegions);
router.route("/kraje/:slug").get(enumController.getDistrictsByRegion);

module.exports = router;
