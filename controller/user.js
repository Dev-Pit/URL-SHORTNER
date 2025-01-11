const UserModel = require("../models/user");
const { setUser, getUser } = require("../services/auth");
// save user to database
async function handleUserPost(req, res) {
	console.log(`Save user called`);
	try {
		const data = req.body;
		console.log("🚀 ~ handleUserPost ~ data:", data);
		const user = UserModel.create({
			...data,
		});
		if (!user) return res.end("Failed to create user");
		return res.redirect("/login");
	} catch (error) {
		console.error(`Failed to save User: ${error}`);
	}
}

async function handleUserLogin(req, res) {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			console.log(`email or password is empty`);
			return res.redirect("/login");
		}

		const user = await UserModel.findOne({ email, password });

		if (!user)
			return res.end(
				"user not found in Database or email or password is empty"
			);

		// * generate token and store it in cookie
		const token = setUser(user);
		// console.log("🚀 ~ handleUserLogin ~ token:", token);

		// cooke require 2 arguments, name and value
		res.cookie("user", token, {
			httpOnly: true, // Prevents access from JavaScript (for security)
			//secure: process.env.NODE_ENV === "production", // Secure cookie in production (HTTPS)
			maxAge: 3600000, // 1 hour expiry (adjust as needed)
		});

		// res.user = getUser(token);

		console.log(`Redirecting to /`);
		return res.redirect("/");
	} catch (error) {
		return res.end("user not found in Database");
	}
}

async function handleUserLogout(req, res) {
	res.clearCookie("user");
	res.redirect("/");
}

// fetch uesr from database
async function handleUserGet(req, res) {
	console.log(`Fetch Users called`);
}

module.exports = {
	handleUserPost,
	handleUserGet,
	handleUserLogin,
	handleUserLogout,
};
