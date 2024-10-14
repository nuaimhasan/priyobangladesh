const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  getAdvertises,
  addAdvertise,
  updateAdvertise,
  deleteAdvertise,
  getSingleAdvertise,
} = require("../controllers/advertiseController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/advertise");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/all-advertise", getAdvertises);

router.post(
  "/add-advertise",
  verifyAdmin,
  upload.single("image"),
  addAdvertise
);
router.patch(
  "/update-advertise/:id",
  verifyAdmin,
  upload.single("image"),
  updateAdvertise
);
router.delete("/delete-advertise/:id", verifyAdmin, deleteAdvertise);
router.get("/:id", getSingleAdvertise);

module.exports = router;
