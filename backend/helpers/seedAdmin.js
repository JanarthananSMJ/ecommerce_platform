const bcrypt = require("bcryptjs");
const User = require("../models/User");

/**
 * Runs on every server startup.
 * Reads ADMIN_EMAIL and ADMIN_PASSWORD from .env and ensures
 * an admin account exists in the database.
 *
 * Scenarios handled:
 *  1. Admin not found  → creates a new admin user.
 *  2. User found but role isn't "admin" → promotes them to admin.
 *  3. Admin already exists with correct role → does nothing.
 */
async function seedAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.warn(
      "[seedAdmin] ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env — skipping admin seed."
    );
    return;
  }

  const existingUser = await User.findOne({ email: ADMIN_EMAIL });

  if (!existingUser) {
    // Admin doesn't exist → create one
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await User.create({
      userName: "admin",
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });
    console.log(`[seedAdmin] Admin account created: ${ADMIN_EMAIL}`);
  } else if (existingUser.role !== "admin") {
    // User exists but isn't an admin → promote
    existingUser.role = "admin";
    await existingUser.save();
    console.log(`[seedAdmin] Existing user promoted to admin: ${ADMIN_EMAIL}`);
  } else {
    console.log(`[seedAdmin] Admin already exists: ${ADMIN_EMAIL}`);
  }
}

module.exports = seedAdmin;
