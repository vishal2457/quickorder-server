const express = require("express");
const router = express.Router();
const { successResponse, serverError } = require("../helpers/response");
const { Categories, MenuItem, Place, Types, AddOns } = require("../models");
const auth = require("../middleware/authJwt");

/**
 * @Add_Menu_Item
 */
router.post("/addNew", auth, async (req, res) => {
  let { CategoryID, ItemDescription, Name, FoodType, Price, Ingredients, MenuTypes, MenuAddOns } =
    req.body;

  await MenuItem.create({
    CategoryID,
    Description: ItemDescription,
    Name,
    FoodType,
    Price,
    Ingredients: Ingredients.toString(),
    PlaceID: req.placeID,
  })
    .then(async (result) => {
      let plainValue = result.get({plain: true});
      let arr = [];
      let addOnsArr = [];
      let typesLength = MenuTypes.length;
      let addOnsLength = MenuAddOns.length;
      let index = 0;

      while(index < typesLength || index < addOnsLength) {

        //handling types
        if(index < typesLength){
          let singleType = MenuTypes[index];
          let obj = {...singleType, MenuItemID: plainValue.ID};
          arr.push(obj);
        }

        //handling addons
        if(index < addOnsLength) {
          let singleAddOn = MenuAddOns[index];
          let addOnObj = {...singleAddOn, MenuItemID: plainValue.ID};
          addOnsArr.push(addOnObj)
        }

        index++;
      }

      await Types.bulkCreate(arr);
      await AddOns.bulkCreate(addOnsArr);
      successResponse(res, result, "Menu Created successfully")
    })
    .catch((error) => serverError(res, error));
});

/**
 * @Get_All_MenuItem
 */
router.get("/getAll", auth, async (req, res) => {
  await Categories.findAll({
    where: { PlaceID: req.placeID },
    include: [{ model: MenuItem, include: [{model: AddOns}, {model: Types}] }],
  })
    .then((result) => successResponse(res, result, "all menu items"))
    .catch((err) => serverError(res, err));
});

/**
 * @Update_Menu_Item
 */
router.post("/update/:id", auth, async (req, res) => {
  let { CategoryID, ItemDescription, Name, FoodType, Price, Ingredients, MenuTypes, MenuAddOns } =
    req.body;

  await MenuItem.update(
    { CategoryID, ItemDescription, Name, FoodType, Price, Ingredients: Ingredients.toString() },
    { where: { ID: req.params.id } }
  ).then(async result => {
    await Types.destroy({where: {MenuItemID: req.params.id}});
    await AddOns.destroy({where: {MenuItemID: req.params.id}});
    let arr = [];
    let addOnsArr = [];
    let typesLength = MenuTypes.length;
    let addOnsLength = MenuAddOns.length;
    let index = 0;

    while(index < typesLength || index < addOnsLength) {

      //handling types
      if(index < typesLength){
        let singleType = MenuTypes[index];
        let obj = {...singleType, MenuItemID: req.params.id};
        arr.push(obj);
      }

      //handling addons
      if(index < addOnsLength) {
        let singleAddOn = MenuAddOns[index];
        let addOnObj = {...singleAddOn, MenuItemID: req.params.id};
        addOnsArr.push(addOnObj)
      }

      index++;
    }

    await Types.bulkCreate(arr);
    return AddOns.bulkCreate(addOnsArr);
  })
    // .then((result) =>  MenuItem.findOne({ where: { ID: req.params.id } }))
    .then((result) =>successResponse(res, result, "Menu updated successfully"))
    .catch((err) => serverError(res, err));
});

/**
 * @Get_Menu_For_Web
 */
router.get("/getAllForWeb/:slug", async (req, res) => {
  await Place.findOne({
    where: { PlaceSlug: req.params.slug },
    include: [
      {
        model: Categories,
        include: [{ model: MenuItem, where: { IsActive: 1 }, include: [{model: AddOns}, {model: Types}]  }],
      },
    ],
    // attributes: ["PlaceName", "Logo", "PlaceSlug", 'ID']
  })
    .then((result) => {
      console.log(result, "slug");
      successResponse(res, result, "Menu");
    })
    .catch((err) => serverError(res, err));
});

/**
 * @Active_Inactive_MenuItem
 */
router.get("/toggleActive/:id/:state", auth, async (req, res) => {
  let switchState = req.params.state == 'true' ? 0 : 1
  await MenuItem.update({IsActive: switchState}, {where: {ID: req.params.id}})
  .then(result => successResponse(res, result, "Menu updated successfully"))
  .catch(err => serverError(res, err))
});

module.exports = router;
