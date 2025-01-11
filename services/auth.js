// * for Authentication, we will use JWT authentication
const jwt = require("jsonwebtoken");

// secret key is confindential so we stored it in .env file
const SECRET_KEY = process.env.SECRET_KEY;

// ** Note: use async if traffic is higher
// returns token
function setUser(user) {
	try {
		console.log(`Signing in JWT: ${user}`);
		return jwt.sign({ ...user }, SECRET_KEY); // we can set expiration duration after secret key, {expiresIn:"1h"}
	} catch (error) {
		console.log(`Error generating token: ${error}`);
	}
}

function getUser(token) {
	if (!token) return null;

	try {
		return jwt.verify(token, SECRET_KEY);
	} catch (error) {
		console.log(`Error verifying token: ${error}`);
	}
}

module.exports = { setUser, getUser };
