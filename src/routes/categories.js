const express = require("express");
const router = express.Router();

const { successResponse, serverError, other } = require("../helpers/response");
const { Categories } = require("../models");
const auth = require("../middleware/authJwt")



/**
 * @Create_New_Category
 */
router.post("/addNew", auth, async (req, res) => {
  await Categories.create({ ...req.body, PlaceID: req.placeID })
    .then((result) => {
      successResponse(res, result.get({ plain: true }), "New Category created");
    })
    .catch((err) => serverError(res, err));
});

/**
 * @Update_Category
 */
router.post("/update/:id", auth, async (req, res) => {
  await Categories.update({ ...req.body }, { where: { ID: req.params.id } })
    .then((result) => {
      successResponse(res, result, "Category updated successfully");
    })
    .catch((err) => serverError(res, err));
});

/**
 * @Get_All_Categories
 */
router.get("/getAll", auth, async (req, res) => {
  console.log(req.PlaceID);
  await Categories.findAll({ where: { PlaceID: req.placeID }, raw: true })
    .then((result) => successResponse(res, result, "All Categories"))
    .catch((err) => serverError(res, err));
});

module.exports = router;

