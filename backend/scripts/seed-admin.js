const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const ADMIN_USERNAME = "admin";
const ADMIN_EMAIL = "admin@1.com";
const ADMIN_PASSWORD = "123456";

async function seedAdmin() {
  await mongoose.connect("mongodb://localhost:27017/ecommerce");

  const existingUser = await User.findOne({ email: ADMIN_EMAIL });

  if (existingUser) {
    existingUser.role = "admin";
    await existingUser.save();
    console.log(`Existing user ${ADMIN_EMAIL} promoted to admin.`);
  } else {
    const hashPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await User.create({
      userName: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: hashPassword,
      role: "admin",
    });
    console.log(`Admin user created: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  }

  await mongoose.disconnect();
}

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
