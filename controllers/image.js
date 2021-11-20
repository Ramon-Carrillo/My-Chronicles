require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });
const cloudinary = require('cloudinary');
cloudinary.config(process.env.CLOUDINARY_URL);

//post route
router.post('/', upload.single('myFile'), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (result) {
    db.image
      .create({
        userId: res.locals.currentUser.id,
        src: result.url,
      })
      .then((createdImage) => {
        console.log(createdImage);
      });
  });
});

module.exports = router;
