const express = require("express");
const { check, validationResult } = require("express-validator");
const leadController = require("../controllers/leadController");

const router = express.Router();

router.post(
  "/",
  [
    check("estateType")
      .not()
      .isEmpty()
      .withMessage("Typ nemovitosti je povinný"),
    check("fullName").not().isEmpty().withMessage("Jméno je povinné"),
    check("phone")
      .matches(/^\+?(420|421)?\d{9}$/)
      .withMessage("Neplatné telefonní číslo"),
    check("email").isEmail().withMessage("Neplatný email"),
    check("region").not().isEmpty().withMessage("Kraj je povinný"),
    check("district").not().isEmpty().withMessage("Okres je povinný"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  leadController.createLead
);

module.exports = router;
