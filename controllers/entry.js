const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.entry.findAll().then((entries) => {
    console.log(entries);
  });
});

router.post('/', (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body));
  console.log('this is data', data);
  db.entry
    .create({
      wins: data.wins,
      allies: data.allies,
      growth: data.growth,
      grateful: data.grateful,
      threats: data.threats,
      todos: data.todos,
    })
    .then((createdEntry) => {
      console.log('db instance created: \n', createdEntry);
      res.redirect('/');
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

module.exports = router;
