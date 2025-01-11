const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
	{
		shortId: { type: "string", required: true, unique: true },
		redirectUrl: { type: "string", required: true },
		visitHistory: [{ timestamp: { type: "number", required: true } }],
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{ timestamps: true }
);

const URL_Model = mongoose.model("url", urlSchema);

module.exports = URL_Model;
