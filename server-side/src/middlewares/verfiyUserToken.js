const jwt = require("jsonwebtoken");

const User = require("../models/User");
const AppError = require("../utils/AppError");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(new AppError("please provide a token", 404));

  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ _id: id });

  if (!user) return next(new AppError("invalid token", 404));

  req.user = user;
  next();
};
