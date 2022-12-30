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

router.get("/addresses/:address", async (req, res, next) => {
  try {
    const addresses = await Address.find({user: req.params.address});
    res.json(addresses);
  } catch (err) {
    next(err);
  }
});

router.post("/newAddress/:address", async (req, res, next) => {
  try {
    req.body.addresses = req.body.addresses;
    req.body.user = req.params.address;
    const newAddress = await Address.create(req.body);
    res.status(201).json(newAddress);
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteAddress/:user/:address", async (req, res, next) => {
  try {
    const deleteAddress = await Address.findOneAndDelete({
      user: req.params.id,
    })
    .then((item) => {
      res.sendStatus(202)
    })
  } catch (err) {
    next(err);
  }
});

module.exports = router;