const sendEmail = require("../config/mail");
const User = require("../models/User");
const { renderTemplate } = require("../utils/template");
const path = require("path");

const submitData = async (req, res) => {
  const { body } = req;
  try {
    const newUser = new User(body);
    await newUser.save();
    const emailTemplate = path.join(req.app.get("views"), "notify.ejs");
    const content = renderTemplate(emailTemplate, {
      email: newUser.email,
      phone: newUser.phone,
      message: newUser.message,
      name: newUser.name,
    });

    const options = {
      email: process.env.EMAIL,
      // cc: staff.email,
      subject: "Honora Form Submission",
      message: "",
      html: content,
    };

    await sendEmail(options);

    return res.redirect("https://www.honoraconsult.com/confirm.html");
    // res.status(200).json({
    //   success: true,
    //   message: "Data saved successfully",
    // });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.redirect("https://www.honoraconsult.com/");
    }

    const resDelete = (await User.find()).filter(
      (item) => item.id !== deleted.id
    );

    return res.status(201).json({
      success: true,
      message: "Data deleted successfully",
      data: resDelete,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getData = async (req, res) => {
  try {
    const data = await User.find({}).sort({ _id: -1 });
    return res.render("messages", { data });

    // res.status(200).json({
    //   success: true,
    //   message: "Data saved successfully",
    //   data,
    // });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  submitData,
  getData,
  deleteData,
};
