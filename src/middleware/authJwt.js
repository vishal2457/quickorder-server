const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/commonHelper");

module.exports = async (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, constants.JWT_SECRET);
    console.log(decoded.PlaceID);
    req.placeID = decoded.PlaceID
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};