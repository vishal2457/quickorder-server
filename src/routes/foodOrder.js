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
const auth = require("../middleware/authJwt");

/**
 * @Food_Order
 */
router.post("/addNew", async (req, res) => {
  let { PlaceSlug, TableNo, TotalAmount, items } = req.body;
  let OrderNo = Math.floor(1000 + Math.random() * 9000);
  await Place.findOne({ where: { PlaceSlug }, raw: true })
    .then((result) => {
      return FoodOrder.create({
        PlaceID: result.ID,
        TableNo,
        TotalAmount,
        OrderNo,
      });
    })
    .then(async (result) => {
      let arr = [];
      for await (let item of items) {
        let obj = {
          MenuItemID: item.ID,
          FoID: result.get({ plain: true }).ID,
          ItemPrice: item.Price,
          Quantity: item.quantity,
          Amount: parseFloat(item.Price) * parseFloat(item.quantity),
        };
        arr.push(obj);
      }
      return FoodOrderDetail.bulkCreate(arr);
    })
    .then((result) =>
      successResponse(res, { result, orderNo: OrderNo }, "Ordered Successfully")
    )
    .catch((err) => serverError(res, err));
});

/**
 * @Get_Pending_Orders
 */
router.get("/getOrder/:type", auth, async (req, res) => {
  await FoodOrder.findAll({
    where: { OrderStatus: req.params.type, PlaceID: req.placeID },
    include: [
      { model: FoodOrderDetail,
        include: {model: MenuItem}
      }
        ],
  })
    .then((result) => {
      successResponse(res, result, `${req.params.type} orders`);
    })
    .catch((err) => {
      serverError(res, err);
    });
});

module.exports = router;
