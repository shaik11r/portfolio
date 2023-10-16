const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hi from server");
});
app.listen(5000, () => console.log("server running"));
const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});
contactEmail.verify((error) => {
  if (error) {
    console.log("something wrong", err);
  } else {
    console.log("ready to send");
  }
});
app.post("/contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: "nadeencool11@gmail.com",
    subject: "contact form submission-Portfolio",
    html: `<p>Name:${name}</p>
        <p>Email:${email}</p>
        <p>phoneNumber:${phone}</p>
        <p>Message:${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({
        status: 200,
        message: "Thanks for your response ",
      });
    }
  });
});
