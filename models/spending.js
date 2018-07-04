const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spendingSchema = new Schema({
    amount: { type: Number, required: true },
    category: { type: String, required: true }
});

const Spending = mongoose.model("Spending", spendingSchema);

module.exports = Spending;