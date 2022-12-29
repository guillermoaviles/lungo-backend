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

router.get("/users/:address", async (req, res, next) => {
  try {
    const user = await User.findOne({address: req.params.address.toLowerCase()});
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/newUser", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteItem/:address", async (req, res, next) => {
  try {
    const deleteUser = await User.findOneAndDelete({ address: req.params.address })
    const deleteAddresses = await Address.deleteMany({user: req.params.address})
    .then((user) => {
      res.sendStatus(204)
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;
