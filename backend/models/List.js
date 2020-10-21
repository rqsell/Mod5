const { Schema, model } = require("mongoose");
const listSchema = new Schema(
  {
    store : String,
    item: String,
    quantity: Number,
    description: String,
    status: {
      type: String,
      enum: ["Checked", "Not Check"],
    },

    
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("List", listSchema);
