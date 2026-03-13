const express = require("express");
const router = express.Router();

router.post("/share", async (req, res) => {

  const { email, docId, role } = req.body;

  // Normally you would find user by email
  // Here we simulate adding them to members

  const Document = require("../models/Document");

  await Document.findByIdAndUpdate(docId, {
    $push: {
      members: {
        user: email,
        role
      }
    }
  });

  res.json({ message: "User added to document" });

});

module.exports = router;