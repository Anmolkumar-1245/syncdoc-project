const Document = require("../models/Document");

exports.createDocument = async (req, res) => {
  try {
    const doc = new Document({
      title: req.body.title,
      owner: req.body.userId,
      members: [{ user: req.body.userId, role: "Owner" }]
    });

    await doc.save();

    res.json(doc);

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({
      "members.user": req.params.userId
    });

    res.json(docs);

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted" });

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateDocument = async (req, res) => {

  try {

    const { id } = req.params;
    const { content } = req.body;

    const Document = require("../models/Document");

    const updatedDoc = await Document.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    res.json(updatedDoc);

  } catch (error) {

    res.status(500).json(error);

  }

};