const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const taskSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

taskSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Task", taskSchema);
