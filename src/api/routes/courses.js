const express = require("express");
const router = express.Router();
const coursesCtrl = require("../controllers/courses");

// routes start with /api/courses

// GET /
router.get("/", coursesCtrl.index);

// POST /api/courses


module.exports = router;
