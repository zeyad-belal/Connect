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
    bio,
    noti
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
      bio,
      noti
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

const login = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;
  if (!email || !password)
    return next(new AppError("email and password are required", 401));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new AppError("user not found", 404));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError("invalid credentials", 401));

  let token;

  if (rememberMe) {
    // If "rememberMe" is true, set a long-lived token with a custom expiration time (1 year)
    const expirationInSeconds = 365 * 24 * 60 * 60; // 1 year in seconds
    token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: expirationInSeconds,
    });
  } else {
    // If "rememberMe" is false, use a regular token with a shorter expiration time (1 hour)
    token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // 1 hour
    });
  }

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
  const user = await User.findById(id)
  .populate({
    path: "cart_items.service",
    populate: {
      path: "user_id",
      model: "User" 
    }
  });

  if (!user) return next(new AppError("user not found", 404));
  res.send({ user });
};

//get user by id
// const updateAllUsersNoti = async (req, res) => {
//   const allUsers = await User.find({})
//   if (!allUsers) return next(new AppError("users not found", 404));

//   const {noti} = req.body

//   for (const user of allUsers) {
//     // Check if the user document still exists in the database
//     const existingUser = await User.findById(user._id);

//     if (!existingUser) {
//       console.log(`User ${user._id} not found in the database.`);
//       continue; // Skip to the next user if not found
//     }

//     // Update 'noti' and save the document
//     existingUser.noti = [...existingUser.noti , noti];
//     await existingUser.save();
//     console.log(`Updated noti for user ${existingUser._id}`);
//   }


//   res.send({ allUsers });
// };

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
    },
    { new: true }
  );
  res.send({ message: "User updated successfully!", updatedUser });
};

// update user info
const updateUser = async (req, res,next) => {
  const { id } = req.user;
  const { first_name, last_name, email, phone_number, role, cart_items,bio,noti } = req.body;
  let {avatar,avatarID } = req.body;

  // handle new image uploud 
  if (req.file) {
    if(avatarID){
      try{
        await imageKit.bulkDeleteFiles([avatarID]);
      }catch(error){
        return next(new AppError("There was an error in deleting user image from ImageKit.",404));
      }
    }
    const image = req.file;
    const res = await imageKit.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "connect-users",
    });
    avatarID = res.fileId;
    avatar = res.url;
  }

  // handle deleltion of avatar 
  if(!avatar && !req.file && avatarID){
    avatar = 'https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph';
    try{
      await imageKit.bulkDeleteFiles([avatarID]);
    }catch(error){
      return next(new AppError("There was an error in deleting user image from ImageKit.",404));
    }
  }

  const user = await User.findByIdAndUpdate(
    id,
    { first_name, last_name, email, phone_number, avatar ,avatarID, role, cart_items,bio,noti },
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
  // updateAllUsersNoti,
  deleteUser,
  login,
  adminLogin,
  dashboardUpdateUser,
  verifyUser,
};
