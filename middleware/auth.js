const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
	const tokenCookie = req.cookies?.user; // Correctly fetch token from cookies
	if (!tokenCookie) {
		// console.log(`checkForAuthentication: user not logged in`);
		return next(); // Allow unauthenticated requests to continue
	}

	try {
		const user = getUser(tokenCookie); // Decode and fetch user from token
		if (user) {
			req.user = user; // Set user details for downstream middleware
			// console.log(`checkForAuthentication: user logged in`);
		}
	} catch (err) {
		console.error(`Error decoding user token: ${err}`);
	}

	next();
}

function checkRoles(roles) {
	return (req, res, next) => {
		if (!req.user) {
			console.log(`checkRoles: user not authenticated`);
			return res.redirect("/login");
		}

		// Extract role correctly, accounting for Mongoose document structure
		const userRole = req.user.role || req.user._doc?.role;
    console.log("Extracted user role:", userRole);
    
		if (!roles.includes(userRole)) {
			console.log(`checkRoles: unauthorized role ${JSON.stringify(req.user)}`);
			return res.end("You are unauthorized!");
		}

		next();
	};
}

module.exports = { checkForAuthentication, checkRoles };
