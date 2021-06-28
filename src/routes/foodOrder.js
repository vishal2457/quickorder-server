const express = require("express");
const router = express.Router();

const { successResponse, serverError, other } = require("../helpers/response");
const { MenuItem, FoodOrder, Place, FoodOrderDetail } = require("../models");
const auth = require("../middleware/authJwt");
const { constants, ORDER_SOCKET } = require("../helpers/commonHelper");
const { Op } = require("sequelize");

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

  let orderTypes = {
    PENDING: "Pending",
    FINISHED: "Finished",
  };
  let type = req.params.type;
  let order = []
  if(type == orderTypes.PENDING ){
    order.push(["createdAt", "DESC"])
  }else {
    order.push(["updatedAt", "DESC"])
  }

  await FoodOrder.findAll({
    where: { OrderStatus: type, PlaceID: req.placeID },
    include: [{ model: FoodOrderDetail, include: { model: MenuItem } }],
    order: order,
  })
    .then((result) => {
      successResponse(res, result, `${type} orders`);
    })
    .catch((err) => {
      serverError(res, err);
    });
});

//order ready
router.get("/updateOrder/:id", auth, async (req, res) => {
  await FoodOrder.update(
    { OrderStatus: constants.ORDER_STATUS.Finished },
    { where: { ID: req.params.id } }
  )
    .then((result) => {
      console.log(result, "this is result");
      successResponse(res, result, "Order updated");
    })
    .catch((err) => serverError(res, err));
});

//generate order
router.post("/generateOrder", async (req, res) => {
  let { PlaceSlug, TableNo, TotalAmount, items } = req.body;
  let OrderNo = Math.floor(1000 + Math.random() * 9000);
  await Place.findOne({ where: { PlaceSlug }, raw: true })
    .then((result) => {
      return FoodOrder.create({
        PlaceID: result.ID,
        TableNo,
        TotalAmount,
        OrderNo,
        OrderStatus: constants.ORDER_STATUS.Unpaid,
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

//recieve order
router.post("/confirmOrder", auth, async (req, res) => {
  await FoodOrder.update(
    { OrderStatus: constants.ORDER_STATUS.Pending },
    { where: { OrderNo: req.body.orderNo } }
  )
    .then((result) => {
      let sockets = req.sockets;
      let userSocket = sockets.get(req.body.userid.toString());
      req.io
        .to(userSocket)
        .emit(ORDER_SOCKET, { orderRecieved: true, orderNo: req.body.orderNo });
      successResponse(res, result, "Order updated");
    })
    .catch((err) => serverError(res, err));
});

/**
 * @get customer orders
 */
router.post("/getCustomerOrders", async (req, res) => {
  await FoodOrder.findAll({
    where: { OrderNo: { [Op.in]: req.body.orders } },
    include: [{ model: FoodOrderDetail, include: [{ model: MenuItem }] }],
    order: [["createdAt", "DESC"]]
  })
    .then((result) => {
      successResponse(res, result, "all orders");
    })
    .catch((err) => console.error(err));
});

module.exports = router;
