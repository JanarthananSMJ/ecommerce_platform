const express = require("express");

const {
  createUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../../controllers/admin/user-controller");

const router = express.Router();

router.post("/add", createUser);
router.get("/get", getAllUsers);
router.put("/update/:id", updateUserRole);
router.delete("/delete/:id", deleteUser);

module.exports = router;
