const express = require("express");
const router = express.Router();

const documentController = require("../controllers/documentController");
const checkRole = require("../middleware/checkRole");

// Create document
router.post("/create", documentController.createDocument);

// Get documents for a user
router.get("/user/:userId", documentController.getDocuments);

// Delete document
router.delete("/:id", documentController.deleteDocument);

// Edit document (RBAC protected)
router.put("/edit/:id", checkRole("editor"), documentController.updateDocument);

module.exports = router;