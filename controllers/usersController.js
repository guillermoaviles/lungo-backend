const express = require("express");
const router = express.Router();

const User = require("../models/User");

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
    console.log("the request I am receiving: ", req)
    const newUser = await User.create(req.body);
    console.log('new user created')
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put("/addAddress/:address", async (req, res, next) => {
  try {
    const userUpdate = await User.findOneAndUpdate(
      { address: req.params.address }, 
      { $push: { addresses: req.body.addresses } },
      {
        new: true
      }
    );
    res.status(201).json(userUpdate);
  } catch (err) {
    next(err);
  }
});

router.put("/deleteAddress/:address", async (req, res, next) => {
  try {
    const userUpdate = await User.findOneAndUpdate(
      { address: req.params.address }, 
      { $pull: { addresses: req.body.addresses } },
      {
        new: true
      }
    );
    res.status(201).json(userUpdate);
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteItem/:address", async (req, res, next) => {
  try {
    const deleteUser = await User.findOneAndDelete({ address: req.params.address })
    .then((deleteUser) => {
      res.sendStatus(204)
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;
