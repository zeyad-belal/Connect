const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const imageKit = require("../utils/imageKit");

// registration
const signUp = async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    password,
    role,
    phone_number,
    cart_items,
    address,
  } = req.body;
  if (!email || !password)
    return next(new AppError("email and password required", 401));

  try {
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password,
      role,
      phone_number,
      cart_items,
      address,
    });
    newUser.password = undefined;

    const user = await User.findOne({ email });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.send({ message: "user created successfully", newUser, token });
  } catch (error) {
    // Check for duplicate email error
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email === 1
    ) {
      return next(new AppError("Email is already registered", 400));
    }
  }
};

//login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("email and password are requird", 401));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new AppError("user not found", 404));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError("invalid credentials", 404));

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  user.password = undefined;
  res.send({ user, token });
};

// Admin panel login
const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("email and password are requird", 401));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new AppError("user not found", 404));

  if (user.role !== "admin" && user.role !== "superAdmin") {
    return next(new AppError("Not allowed user", 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError("invalid credentials", 404));

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  user.password = undefined;
  res.send({ user, token });
};

//get all users
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

//get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("cart_items.service");
  if (!user) return next(new AppError("user not found", 404));
  res.send({ user });
};

// verify logged-in user from admin panel
const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(new AppError("No token provided!", 404));
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(id);
  res.send({ loggedInUser: user });
};

// update user from admin panel
const dashboardUpdateUser = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email,
    phone_number,
    cart_items,
    role,
    address,
  } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      first_name,
      last_name,
      email,
      phone_number,
      cart_items,
      role,
      address,
    },
    { new: true }
  );
  res.send({ message: "User updated successfully!", updatedUser });
};

// update user info
const updateUser = async (req, res) => {
  const { id } = req.user;
  const {
    first_name,
    last_name,
    email,
    phone_number,
    address,
    avatar,
    role,
    cart_items
  } = req.body;
console.log('ssssssssssssssssssssssssssssssssssss' , req.files)
  

  let imagesInfo;
  if (req.file) {
      const image = req.file;
      const res = await imageKit.upload({
        file: image.buffer.toString("base64"),
        fileName: image.originalname,
        folder: "users",
      });
      imagesInfo = res.url;
  }


  const user = await User.findByIdAndUpdate(
    id,
    {
      first_name,
      last_name,
      email,
      phone_number,
      address,
      avatar : imagesInfo,
      role,
      cart_items
    },
    { new: true }
  );
  res.send({ user });
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  res.send({ user });
};

module.exports = {
  signUp,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
  adminLogin,
  dashboardUpdateUser,
  verifyUser,
};
