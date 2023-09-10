const express = require("express");
const router = express.Router();
const coursesCtrl = require("../controllers/courses");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

// routes start with /api/courses

// GET /
router.get("/", coursesCtrl.index);

// POST /api/courses
router.post("/", coursesCtrl.create);

// DELETE /api/courses/:id
router.delete("/:id", ensureLoggedIn, coursesCtrl.destroy);

// PUT /api/courses/:id
router.put('/:id', coursesCtrl.update);

module.exports = router;
