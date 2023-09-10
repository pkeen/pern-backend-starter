// const createError = require("http-errors");
const express = require("express");
const path = require("path");
// const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const checkJWT = require("./api/middleware/checkJWT");
const { sequelize } = require("./db/models/index");
// const { devSyncAndSeed } = require("./db/utilities/syncAndSeed");
const devSyncMode = require("./db/utilities/devSyncMode");
// const synchronize = require('./models/modelIndex');
const { up, down } = require("./db/seeders/simple-db-seed");

// Routes
const indexRouter = require("./api/routes/index");
const usersRouter = require("./api/routes/users");
const coursesRouter = require("./api/routes/courses");

// devSyncAndSeed(sequelize, up);
devSyncMode(sequelize, up);

// sequelize
// 	.authenticate()
// 	.then(() => {
// 		console.log("Database connection established successfully.");
// 		sequelize.sync({ force: true })
//       .catch((err) => {
// 			console.error("Failed to start the app:", err);
// 		});
// 	})
// 	.catch((err) => {
// 		console.error("Unable to connect to the database:", err);
// 	});

// (async () => {
//   await up();
// })()

// synchronize();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// configure CORS
app.use(
	cors({
		origin: "http://localhost:5173", // your frontend server's address
		// origin: false // should disable
	})
);
// Middleware to check and verify a JWT
// and assign the user object from the JWT to req.user
app.use(checkJWT);

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
// app.use('/', authRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get("env") === "development" ? err : {};

// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render("error");
// });

module.exports = app;
