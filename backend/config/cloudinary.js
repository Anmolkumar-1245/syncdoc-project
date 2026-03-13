const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dpyjrn7ff",
  api_key: "384665241857753",
  api_secret: "Bd0qfjs1ALWUUh4J-RMm6P_KF-c"
});

module.exports = cloudinary;