import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import AppError from "../utils/AppError";
import imageKit from "../utils/imageKit";

// registration
const signUp = async (req: any, res: any, next: any) => {
  const {
    first_name,
    last_name,
    email,
    password,
    role,
    phone_number,
    cart_items,
    bio,
  } = req.body;
  
  if (!email || !password) {
    return next(new AppError("email and password required", 401));
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        firstName: first_name,
        lastName: last_name,
        email,
        password,
        role: role || 'user',
        phoneNumber: phone_number,
        bio,
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET!
    );

    res.send({ message: "user created successfully", newUser: userWithoutPassword, token });
  } catch (error: any) {
    // Check for duplicate email error (Prisma unique constraint violation)
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return next(new AppError("Email is already registered", 400));
    }
    return next(new AppError("Failed to create user", 500));
  }
};

const login = async (req: any, res: any, next: any) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    if (!email || !password) {
      return next(new AppError("email and password are required", 401));
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) return next(new AppError("user not found", 404));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new AppError("invalid credentials", 401));

    let token;

    // Calculate the expiration time in seconds based on rememberMe
    const expirationInSeconds = rememberMe ? 365 * 24 * 60 * 60 : 60 * 60; // 1 year or 1 hour

    token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: expirationInSeconds,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.send({ user: userWithoutPassword, token });
  } catch (error) {
    return next(new AppError("Login failed", 500));
  }
};

// Admin panel login
const adminLogin = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return next(new AppError("email and password are required", 401));
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) return next(new AppError("user not found", 404));

    if (user.role !== "admin" && user.role !== "superAdmin") {
      return next(new AppError("Not allowed user", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new AppError("invalid credentials", 404));

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.send({ user: userWithoutPassword, token });
  } catch (error) {
    return next(new AppError("Admin login failed", 500));
  }
};

//get all users
const getAllUsers = async (req: any, res: any, next: any) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
        avatarID: true,
        phoneNumber: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password from selection
      }
    });
    
    res.send(users);
  } catch (error) {
    return next(new AppError("Failed to fetch users", 500));
  }
};

//get user by id
const getUserById = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    
    // Convert string ID to integer for PostgreSQL
    const userId = parseInt(id);
    
    if (isNaN(userId)) {
      return next(new AppError("Invalid User ID.", 400));
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        cartItems: {
          include: {
            service: {
              include: {
                user: true
              }
            }
          }
        }
      },
      // Exclude password from selection
    });

    if (!user) return next(new AppError("user not found", 404));
    
    // Remove password from response if it exists
    const { password: _, ...userWithoutPassword } = user as any;
    
    res.send({ user: userWithoutPassword });
  } catch (error) {
    return next(new AppError("Failed to fetch user", 500));
  }
};

// verify logged-in user from admin panel
const verifyUser = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization;

    if (!token) return next(new AppError("No token provided!", 404));
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const { id } = decoded;
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
        avatarID: true,
        phoneNumber: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password from selection
      }
    });
    
    if (!user) return next(new AppError("User not found", 404));
    
    res.send({ loggedInUser: user });
  } catch (error) {
    return next(new AppError("Token verification failed", 401));
  }
};

// update user from admin panel
const dashboardUpdateUser = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, role } = req.body;

    // Convert string ID to integer for PostgreSQL
    const userId = parseInt(id);
    
    if (isNaN(userId)) {
      return next(new AppError("Invalid User ID.", 400));
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: first_name,
        lastName: last_name,
        email,
        phoneNumber: phone_number,
        role,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
        avatarID: true,
        phoneNumber: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password from selection
      }
    });
    
    res.send({ message: "User updated successfully!", updatedUser });
  } catch (error) {
    return next(new AppError("Failed to update user", 500));
  }
};

// update user info
const updateUser = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.user;
    const { first_name, last_name, email, phone_number, role, bio } = req.body;
    let { avatar, avatarID } = req.body;

    // handle new image upload
    if (req.file) {
      if (avatarID) {
        try {
          await imageKit.bulkDeleteFiles([avatarID]);
        } catch (error) {
          return next(
            new AppError(
              "There was an error in deleting user image from ImageKit.",
              404
            )
          );
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

    // handle deletion of avatar
    if (!avatar && !req.file && avatarID) {
      avatar =
        "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph";
      try {
        await imageKit.bulkDeleteFiles([avatarID]);
        avatarID = "";
      } catch (error) {
        return next(
          new AppError(
            "There was an error in deleting user image from ImageKit.",
            404
          )
        );
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        firstName: first_name,
        lastName: last_name,
        email,
        phoneNumber: phone_number,
        avatar,
        avatarID,
        role,
        bio,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
        avatarID: true,
        phoneNumber: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password from selection
      }
    });

    res.send({ user });
  } catch (error) {
    return next(new AppError("Failed to update user", 500));
  }
};

// delete user
const deleteUser = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    
    // Convert string ID to integer for PostgreSQL
    const userId = parseInt(id);
    
    if (isNaN(userId)) {
      return next(new AppError("Invalid User ID.", 400));
    }

    const user = await prisma.user.delete({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
        avatarID: true,
        phoneNumber: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password from selection
      }
    });

    res.send({ user });
  } catch (error) {
    return next(new AppError("Failed to delete user", 500));
  }
};

export {
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
