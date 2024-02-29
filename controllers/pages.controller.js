const getHomePage = (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
};
const getAboutPage = (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
};
const getServices = (req, res) => {
  res.sendFile(__dirname + "/public/services.html");
};
const getContact = (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
};
const getConfirm = (req, res) => {
  res.sendFile(__dirname + "/public/confirm.html");
};

module.exports = {
  getHomePage,
  getAboutPage,
  getServices,
  getContact,
  getConfirm,
};
