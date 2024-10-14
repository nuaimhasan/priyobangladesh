const router = require("express").Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");
const {
  addAdmin,
  login,
  getMe,
  getAllWriters,
  getAllAdmins,
  updateInfo,
  deleteUser,
  getUserById,
  updatePassword,
  addWriter,
  updateStatus,
  getUserBySlug,
} = require("../controllers/userController");
const verifyWriter = require("../middleware/verifyWriter");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/user");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add-admin", verifyAdmin, addAdmin); // add new admin
router.post("/add-writer", verifyAdmin, addWriter); // add new writer

router.post("/login", login); //user login
router.get("/loggedUser", verifyToken, getMe); //get logged user

router.get("/allWriters", getAllWriters); //get all writers
router.get("/allAdmins", getAllAdmins); //get all admins
router.get("/profile/:id", getUserById);
router.get("/profile/userName/:userName", getUserBySlug);

router.patch("/update-status/:id", verifyAdmin, updateStatus);

router.patch("/update/:id", verifyToken, upload.single("image"), updateInfo);
router.patch("/update-password/:id", verifyToken, updatePassword);

router.delete("/delete/:id", verifyAdmin, deleteUser);

module.exports = router;
