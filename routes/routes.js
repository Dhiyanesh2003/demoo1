const express = require("express");
const router = express.Router();

const { googleAuth, verifyAuth } = require('../controllers/authController')

const verifyToken = require('../middlewares/auth')

router.post("/auth", googleAuth);
router.get("/auth", (req, res) => {
    res.send("Hello");
});  
router.post("/verifyAuth", verifyToken , verifyAuth);

module.exports = router;