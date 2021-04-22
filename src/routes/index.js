module.exports = function (app) {
    app
      .use("/place", require("./place"))
      .use("/menuItem", require("./menuItem"))
      .use("/foodOrder", require("./foodOrder"))
      .use("/categories", require("./categories"))
  };
  