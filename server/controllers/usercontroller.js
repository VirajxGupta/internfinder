
import { db, auth } from "../firebaseAdmin.js"; // ✅ sirf db import kar
import admin from "firebase-admin";
// userController.js
import { createUser, getUsers, getUserByEmail } from "../models/userModel.js";
import bcrypt from "bcryptjs";

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await createUser({ name, email, password: hashedPassword });

    res.status(201).json({ user, message: "User registered successfully 🚀" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials ❌" });
    }

    res.status(200).json({ user, message: "Login successful ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GOOGLE LOGIN
export const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const { name, email, picture, uid } = decodedToken;

    // Check if user exists
    let user = await getUserByEmail(email);

    if (!user) {
      // Create new user if doesn't exist
      // Note: We might want to set a random password or mark as google-auth user
      // For now, we'll create a user with a dummy password or modify model to support no-password
      // Assuming model requires password, we generate a random hash
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await createUser({
        name: name || "Google User",
        email,
        password: hashedPassword,
        photo: picture
      });
    }

    // You might want to update the photo if it changed, logic here...

    res.status(200).json({ user, message: "Google Login successful \u2705" });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({ message: "Invalid Google Token \u274C" });
  }
};

// GITHUB LOGIN
export const githubLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const { name, email, picture, uid, firebase } = decodedToken;

    // GitHub often provides different data structure, or no email if private
    // But Firebase Auth normalizes it a bit. However, email might be null if user keeps it private.

    // If email is missing, we can't easily link to existing account or rely on email as unique identifier for our DB
    // For now, we'll assume email exists or fail gracefully
    if (!email) {
      return res.status(400).json({ message: "GitHub account must have a public email address to sign up." });
    }

    // Check if user exists
    let user = await getUserByEmail(email);

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await createUser({
        name: name || "GitHub User",
        email,
        password: hashedPassword,
        photo: picture
      });
    }

    res.status(200).json({ user, message: "GitHub Login successful \u2705" });
  } catch (error) {
    console.error("GitHub Auth Error:", error);
    res.status(401).json({ message: "Invalid GitHub Token \u274C" });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    // Firebase Realtime DB me kuch delete karne ki zarurat nahi
    // Bas frontend ko inform kar rahe hai ki logout successful
    res.status(200).json({ message: "Logout successful ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get user profile (protected route)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile (protected route)
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password; // Make sure password hashing handled in model middleware
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
