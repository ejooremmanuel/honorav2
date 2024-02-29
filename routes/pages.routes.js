const {
  getHomePage,
  getAboutPage,
  getServices,
  getContact,
  getConfirm,
} = require("../controllers/pages.controller");
const router = require("express").Router();

router.get("/about.html", getAboutPage);
router.get("/services.html", getServices);
router.get("/contact.html", getContact);
router.get("/index.htm", getHomePage);
router.get("/confirm.html", getConfirm);

module.exports = router;
