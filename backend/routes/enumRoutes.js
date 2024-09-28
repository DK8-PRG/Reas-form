const express = require("express");
const enumController = require("../controllers/enumController");

const router = express.Router();

router.route("/estate-types").get(enumController.getEstateType);
router.route("/regions").get(enumController.getRegions);
router.route("/regions/:slug").get(enumController.getDistrictsByRegion);

module.exports = router;
