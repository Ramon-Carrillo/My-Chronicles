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
      userId: res.locals.currentUser.id,
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

router.put('/:id', (req, res) => {
  db.entry
    .findByPk(req.params.id)
    .then((entry) => {
      entry.update({
        wins: req.body.wins,
        allies: req.body.wins,
        growth: req.body.growth,
        grateful: req.body.grateful,
        threats: req.body.threats,
        todos: req.body.todos,
      });
      res.redirect('/entry?wins=&allies=&growth=&grateful=&threats=&todos=');
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
      console.log(deletedEntry);
      if (deletedEntry === 1) {
        res.redirect('/entry?wins=&allies=&growth=&grateful=&threats=&todos=');
      } else {
        console.log('nada');
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
});

router.get('/:id', (req, res) => {
  console.log('this is  id\n', req.params.id);
  db.entry
    .findOne({ where: { id: req.params.id } })
    .then((foundEntry) => {
      res.render('singleEntry', {
        id: foundEntry.id,
        wins: foundEntry.wins,
        allies: foundEntry.allies,
        growth: foundEntry.growth,
        grateful: foundEntry.grateful,
        threats: foundEntry.threats,
        todos: foundEntry.todos,
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
});
module.exports = router;
