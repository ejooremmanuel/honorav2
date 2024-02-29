const chatMe = (req, res) => {
  try {
    res.status(200).json({ response: "Hello World" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { chatMe };
