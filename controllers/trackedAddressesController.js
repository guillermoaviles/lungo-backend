const express = require("express");
const Address = require("../models/Address");
const router = express.Router();


router.get("/addresses", async (req, res, next) => {
  try {
    const addresses = await Address.find({});
    res.json(addresses);
  } catch (err) {
    next(err);
  }
});

router.get("/addresses/:id", async (req, res, next) => {
  try {
    const addresses = await Address.find({user: req.params.address});
    res.json(addresses);
  } catch (err) {
    next(err);
  }
});

router.post("/newAddress/:id", async (req, res, next) => {
  try {
    req.body.user = req.body.user;
    req.body.address = req.params.address;
    const newAddress = await Address.create(req.body);
    res.status(201).json(newAddress);
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteAddress/:id", async (req, res, next) => {
  try {
    const deleteAddress = await Address.findOneAndDelete({
      _id: req.params.id,
    })
    .then((item) => {
      res.sendStatus(202)
    })
  } catch (err) {
    next(err);
  }
});

module.exports = router;