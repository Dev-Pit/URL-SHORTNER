const mongoose = require("mongoose");

// first create schema
const userSchema = mongoose.Schema({
	fullname: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: "NORMAL" },
});

// checks before saving that role is assigned or not, if not then it will be assigned as NORMAL
userSchema.pre("save", function (next) {
	if (!this.role || this.role.trim() === "") {
		this.role = "NORMAL";
	}
	next();
});

// create model instance
const User_Model = mongoose.model("user", userSchema);

// export it to use
module.exports = User_Model;
