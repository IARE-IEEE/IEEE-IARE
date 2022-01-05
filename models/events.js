const mongoose = require("mongoose");
let eventSchema = new mongoose.Schema({
  __id: mongoose.Schema.Types.ObjectId,
  data: Object,
});
module.exports = mongoose.model("events", eventSchema);
