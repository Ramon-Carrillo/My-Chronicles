require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });
const cloudinary = require('cloudinary');
cloudinary.config(process.env.CLOUDINARY_URL);

//get route
router.get('/', (req, res) => {
  db.image
    .findAll()
    .then((images) => {
      res.render('image', { results: images });
    })
    .catch((err) => {
      console.error(err.message);
    });
});

//post route
router.post('/', upload.single('myFile'), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (result) {
    db.image
      .create({
        userId: res.locals.currentUser.id,
        src: result.url,
      })
      .then(() => {
        res.redirect('/image');
      });
  });
});

router.delete('/:id', (req, res) => {
  db.image
    .destroy({
      where: { id: req.params.id },
    })
    .then((deleteImage) => {
      console.log(deleteImage);
      if (deleteImage === 1) {
        res.redirect('/image');
      } else {
        console.log('nada');
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
});

module.exports = router;
