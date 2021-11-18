const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.entry
    .findAll()
    .then((entries) => {
      res.render('indexEntries', { results: entries });
    })
    .catch((err) => {
      console.error(err.message);
    });
});

router.post('/', (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body));
  db.entry
    .create({
      wins: data.wins,
      allies: data.allies,
      growth: data.growth,
      grateful: data.grateful,
      threats: data.threats,
      todos: data.todos,
    })
    .then(() => {
      res.redirect(`/entry?wins=&allies=&growth=&grateful=&threats=&todos=`);
    })
    .catch((error) => {
      console.error(error.message);
    });
});

router.delete('/:id', (req, res) => {
  db.entry
    .destroy({
      where: { id: req.params.id },
    })
    .then((deletedEntry) => {
      console.log('you deleted: ', deletedEntry);
    });
});

router.get('/:id', (req, res) => {
  console.log('this is the fave id\n', req.params.id);
});
module.exports = router;
