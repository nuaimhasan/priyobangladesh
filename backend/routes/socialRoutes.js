const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const { add, get, update } = require("../controllers/socialController");

router.post("/add", verifyAdmin, add);
router.get("/all", get);

router.delete("/delete/:id", verifyAdmin, update);

module.exports = router;
