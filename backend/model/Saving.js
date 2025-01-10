const mongoose = require("mongoose");

const savingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
        type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Saving", savingSchema);
