const mongoose = require("mongoose");
mongoose.set("strictQuery", true); // it ensures only valid fields are used

async function connectToMongoDB(url) {
	return await mongoose.connect(url);
}

module.exports = { connectToMongoDB };
