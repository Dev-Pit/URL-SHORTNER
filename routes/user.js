const express = require("express");
const {
	handleUserGet,
	handleUserPost,
	handleUserLogin,
	handleUserLogout,
} = require("../controller/user");

const router = express.Router();

router.get("/", handleUserGet);
router.post("/", handleUserPost);
// sends login data to controller to verify it
router.post("/login", handleUserLogin);

router.get("/logout", handleUserLogout)

module.exports = router;
