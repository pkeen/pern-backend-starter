const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");

// these routes begin with /api/users

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

// POST /api/users -- Create a user
router.post("/", usersCtrl.create);

// POST /api/users/login -- Login
router.post("/login", usersCtrl.login);

module.exports = router;
