const express = require("express");
const router = express.Router();
const { successResponse, serverError } = require("../helpers/response");
const { Categories, MenuItem } = require("../models");
const auth = require("../middleware/authJwt");

/**
 * @Add_Menu_Item
 */
router.post("/addNew", auth, async (req, res) => {
  let {
    CategoryID,
    ItemDescription,
    Name,
    FoodType,
    Price,
    Ingredients,
  } = req.body;

  await MenuItem.create({
    CategoryID,
    Description: ItemDescription,
    Name,
    FoodType,
    Price,
    Ingredients: Ingredients.toString(),
    PlaceID: req.placeID,
  })
    .then((result) => successResponse(res, result, "Menu Created successfully"))
    .catch((error) => serverError(res, error));
});

/**
 * @Get_All_MenuItem
 */
router.get("/getAll", auth, async (req, res) => {
  await Categories.findAll({
    where: { PlaceID: req.placeID },
    include: [{ model: MenuItem }],
  })
    .then((result) => successResponse(res, result, "all menu items"))
    .catch((err) => serverError(res, err));
});

/**
 * @Update_Menu_Item
 */
router.post("/update/:id", auth, async (req, res) => {
  await MenuItem.update({ ...req.body }, { where: { ID: req.params.id } })
    .then((result) => {
      return MenuItem.findOne({ where: { ID: req.params.ID } });
    })
    .then((result) =>
      successResponse(res, req, result, "Menu updated successfully")
    )
    .catch((err) => serverError(res, err));
});

/**
 * @Get_Menu_For_Web
 */
router.get("/getAllForWeb/:id", async (req, res) => {
  Categories.findAll({
    where: { PlaceID: req.params.id },
    include: [{ model: MenuItem }],
  })
    .then((result) => successResponse(res, req, result, "Menu"))
    .catch((err) => serverError(res, req, err));
});

module.exports = router;
