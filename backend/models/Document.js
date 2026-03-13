const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({

  title: String,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      role: {
        type: String,
        enum: ["owner", "editor", "viewer"],
        default: "viewer"
      }
    }
  ],

  content: {
    type: String,
    default: ""
  }

});

module.exports = mongoose.model("Document", documentSchema);