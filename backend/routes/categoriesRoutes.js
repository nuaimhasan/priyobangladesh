const router = require("express").Router();
const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");
const verifyToken = require("../middleware/verifyToken");

// Category:
router.post("/add-category", verifyToken, addCategory);
router.get("/all-category", getCategories);

router.get("/:id", getCategory);
router.patch("/update-category/:id", verifyToken, updateCategory);
router.delete("/delete-category/:id", verifyToken, deleteCategory);

module.exports = router;
