const {
  submitData,
  getData,
  deleteData,
} = require("../controllers/auth.controller");
const { chatMe } = require("../controllers/chat.controller");

const router = require("express").Router();

router.post("/", submitData);
router.post("/chat", chatMe);
router.get("/", getData);
router.delete("/delete/:id", deleteData);

module.exports = router;
