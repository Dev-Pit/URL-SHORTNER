const express = require("express");
const { handleUrlPost, handleUpdateUrlPost } = require("../controller/url");

const router = express.Router();

router.get("/", (req, res) => {});
router.post("/", handleUrlPost);
router.get("/:shortId/update", handleUpdateUrlPost);

module.exports = router;
