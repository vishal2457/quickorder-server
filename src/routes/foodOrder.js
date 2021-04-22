const express = require("express");
const router = express.Router();

const { successResponse, serverError, other } = require("../helpers/response");
const {
  Categories,
  MenuItem,
  FoodOrder,
  Place,
  FoodOrderDetail,
} = require("../models");
const auth = require("../middleware/authJwt")


/**
 * @Food_Order
 */
router.post("/addNew", async (req, res) => {
  let { PlaceSlug, TableNo, OrderNo, TotalAmount, items } = req.body;
  await Place.findOne({ where: { PlaceSlug }, raw: true })
    .then((result) => {
      return FoodOrder.create({
        PlaceID: result.ID,
        TableNo,
        OrderNo,
        TotalAmount,
      });
    })
    .then(async (result) => {
      let arr = [];
      for await (let item of items) {
        let obj = {
          MenuItemID: item.ID,
          FoID: result.get({ plain: true }).ID,
          ItemPrice: item.ItemPrice,
          Quantity: item.Quantity,
          Amount: parseFloat(item.ItemPrice) * parseFloat(item.Quantity),
        };
        arr.push(obj);
      }
      return FoodOrderDetail.bulkCreate(arr);
    })
    .then((result) => successResponse(res, result, "Ordered Successfully"))
    .catch((err) => serverError(res, err));
});

/**
 * @Get_Pending_Orders
 */
// router.post


module.exports = router;
