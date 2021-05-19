//this file is responsible for all authentication of application
const express = require("express");
const router = express.Router();
const { successResponse, serverError, other, unauthorized } = require("../helpers/response");
const { Place } = require("../models");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authJwt")
const bcrypt = require("bcryptjs");
const { constants } = require("../helpers/commonHelper");

/**
 * @Add_New_Place register a new place
 */
router.post("/newPlace", async (req, res) => {
  const { Password, PlaceName, PlaceSlug } = req.body;

  await Place.findOne({ where: { PlaceSlug }, raw: true })
    .then(async (place) => {
      if (place) return other(res, "Place Slug already exists");

      const salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(Password, salt);

      await Place.create({
        PlaceName,
        PlaceSlug,
        Password: hashedPassword,
      })
        .then((result) => {
          jwt.sign(
            { PlaceID: result.get({ plain: true }).ID },
            constants.JWT_SECRET,
            {
              expiresIn: "24h",
            },
            (err, token) => {
              if (err) throw err;
              successResponse(res, token, "Place created successfully");
            }
          );
        })
        .catch((err) => serverError(res, err));
    })
    .catch((err) => serverError(res, err));
});

/**
 * @Restaurant_Login
 */
router.post("/placeLogin", async (req, res) => {
  let { PlaceSlug, Password } = req.body;
  await Place.findOne({ where: { PlaceSlug }, raw: true }).then(
    async (result) => {
      if (!result) return unauthorized(res, "Invalid credentials");

      const isMatch = await bcrypt.compare(Password, result.Password);
      if (!isMatch) return unauthorized(res, "Invalid credentials");
      jwt.sign(
        { PlaceID: result.ID },
        constants.JWT_SECRET,
        {
          expiresIn: "24h",
        },
        (err, token) => {
          if (err) throw err;
          successResponse(res, token, "Place created successfully");
        }
      );
    }
  ).catch(err => {
    console.log(err);
    serverError(res, err)
  })
});

/**
 * @Check_Mail
 */
router.post("/checkSlug", auth, async (req, res) => {
  await Place.findOne({ where: { PlaceSlug: req.body.PlaceSlug } })
    .then((result) => {
      if (result) other(res, "Name already taken");
      successResponse(res, result, "Slug available");
    })
    .catch((err) => serverError(res, err));
});

module.exports = router;
