require("dotenv").config();
const { checkForAuthentication, checkRoles } = require("./middleware/auth");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const staticRoutes = require("./routes/static");
const urlRoute = require("./routes/url");
const userRoutes = require("./routes/user");

// create server instance
const app = express();
// get data from .env file
const PORT = process.env.PORT;
const DB_URL = process.env.DB_CONNECTION_URL;

// connect to database
connectToMongoDB(DB_URL)
	.then(() => console.log(`Connected to MongoDB.`))
	.catch((err) => console.log(`Error while connecting to database: ${err}`));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// serverside rendering
app.set("view engine", "ejs");
app.use(express.static("public")); // Optional, for serving static files like CSS/JS
app.set("views", path.resolve("./views"));

// rest routes
app.use("/api", urlRoute);
app.use("/user", userRoutes);
// static routes
app.use("/", staticRoutes);

app.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`);
});
