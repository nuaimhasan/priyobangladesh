const router = require("express").Router();
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const {
  addNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
  updateStatus,
  getNewsesByWriter,
  getNewsBySlug,
} = require("../controllers/newsController");
const verifyAdmin = require("../middleware/verifyAdmin");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/news");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add-news", verifyToken, upload.single("image"), addNews);
router.get("/all-news", getAllNews);

router.get("/:id", getNewsById);
router.get("/newsBySlug/:slug", getNewsBySlug);
router.get("/writer/:writerId", getNewsesByWriter);

router.patch("/status-change/:id", verifyAdmin, updateStatus);
router.patch(
  "/update-news/:id",
  verifyToken,
  upload.single("image"),
  updateNews
);
router.delete("/delete-news/:id", verifyToken, deleteNews);

module.exports = router;
