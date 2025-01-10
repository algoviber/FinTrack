const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Saving = require("../model/Saving");

const savingController = {
    
    //!get
  get: asyncHandler(async (req, res) => {
    let filters = { user: req.user };
    //! Find
    const savings = await Saving.find(filters).sort({ date: -1 });
    console.log(savings[0]);
    res.status(201).json(savings[0]);
  }),

  //!add
  create: asyncHandler(async (req, res) => {
    const { amount, endDate } = req.body;
    if (!amount || !endDate) {
      throw new Error("Amount and date are required");
    }
    //! Create
    const saving = await Saving.create({
      user: req.user,
      amount,
      endDate
    });
    res.status(201).json(saving);
  }),

  //!update
  update: asyncHandler(async (req, res) => {
    //! Find the saving
    const saving = await Saving.findById(req.params.id);
    if (saving && saving.user.toString() === req.user.toString()) {
        (saving.amount = req.body.amount || saving.amount),
        (saving.endDate = req.body.endDate || saving.endDate);
      //update
      const updatedsaving = await saving.save();
      console.log("updated");
      console.log(req.body);
      res.json(updatedsaving);
    }
  }),
  //! delete
  delete: asyncHandler(async (req, res) => {
    //! Find the saving
    const saving = await saving.findById(req.params.id);
    if (saving && saving.user.toString() === req.user.toString()) {
      await saving.findByIdAndDelete(req.params.id);
      res.json({ message: "saving removed" });
    }
  }),
};

module.exports = savingController;
