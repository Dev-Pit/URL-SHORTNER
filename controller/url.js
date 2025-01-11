const UrlModel = require("../models/url");
const { nanoid } = require("nanoid");
async function handleUrlPost(req, res) {
	// console.log(`post url called: ${req.body.urlValue}`);
	const body = req.body;
	try {
		if (!body) return res.end("Insert url link and save");
		// console.log(req.body);
		const { urlValue } = body;
		// console.log("🚀 ~ handleUrlPost ~ urlValue:", urlValue);
		const shortId = nanoid(6);
		// console.log(`user in cookie: ${JSON.stringify(req.user)}`);
		await UrlModel.create({
			shortId: shortId,
			redirectUrl: urlValue,
			visitHistory: [],
			createdBy: req.user._doc._id,
		});
		return res.status(200).json({ status: "success", result: body });
	} catch (error) {
		// console.log(`Error while posting url: ${error}`);
		return res.end(`Error while posting url: ${error}`);
	}
}

async function handleUpdateUrlPost(req, res) {
	const { shortId } = req.params;
	if (!shortId) return res.end(`Link: ${shortId} is not on the server.`);

	const user = await UrlModel.findOne({ shortId });

	if (!user)
		return res.end(
			`The link you are searching for is not available on the server.`
		);

	await UrlModel.updateOne(
		{ shortId },
		{ $push: { visitHistory: { timestamp: Date.now() } } }
	);
	return res.redirect(`${user.redirectUrl}`);
}

module.exports = { handleUrlPost, handleUpdateUrlPost };
