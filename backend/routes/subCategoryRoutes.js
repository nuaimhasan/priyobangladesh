const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {
  add,
  get,
  getSingle,
  update,
  destroy,
} = require("../controllers/subCategoryController");

router.post("/add", verifyToken, add);
router.get("/all", get);

router.get("/:id", getSingle);
router.patch("/update/:id", verifyToken, update);
router.delete("/delete/:id", verifyToken, destroy);

module.exports = router;
