const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(new AppError("please provide a token", 404));

  const { role } = jwt.verify(token, process.env.JWT_SECRET);

  if (role == "admin" || role == "superAdmin") {
    next();
  } else {
    return next(new AppError("only superAdmin and  admin can do this", 401));
  }
};
