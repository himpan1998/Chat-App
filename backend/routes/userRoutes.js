const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/userController");

// Configure Multer for handling file uploads
const uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
});

router.post(
  "/register-user",
  uploader.single("image"),
  userController.registerUser
);
router.post("/login", userController.userLogin);
module.exports = router;
