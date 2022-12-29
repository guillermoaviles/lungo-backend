const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Address = require('../models/Address')

router.get("/users", async (req, res, next) => {
  try {
    const item = await User.find({});
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const item = await User.findById(req.params.id);
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.post("/newUser", async (req, res, next) => {
  try {
    const newUser = await (await User.create(req.body));
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put("/edit/:id", async (req, res, next) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    )
    .then((item) => {
      res.sendStatus(202)
    })
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteItem/:id", async (req, res, next) => {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: req.params.id })
    const deleteAddresses = await Address.deleteMany({user: req.params.id})
    .then((user) => {
      res.sendStatus(204)
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;
