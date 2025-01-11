const express = require("express");
const { checkRoles } = require("../middleware/auth");
const URL = require("../models/url");

const router = express.Router();

router.get("/", checkRoles(["NORMAL", "ADMIN"]), async (req, res) => {
	if (!req.user) {
		return res.redirect("/login");
	} else {
		// todo: send data to UI if needed
		const role = req.user._doc.role;
		const email = req.user._doc.email;

		switch (role) {
			case "ADMIN": {
				const urls = await URL.find({});
				return res.render("home", { urls, email });
			}
			case "NORMAL": {
				const urls = await URL.find({
					createdBy: req.user._doc._id,
					role: "NORMAL",
				});
				return res.render("home", { urls, email });
			}
			default:
				return res.end("Sorry, you are unauthorized!");
		}
	}
});

router.get("/login", async (req, res) => {
	return res.render("login");
});
router.get("/signup", async (req, res) => {
	return res.render("signup");
});

module.exports = router;
