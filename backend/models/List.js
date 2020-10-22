const { Schema, model } = require("mongoose");
const listSchema = new Schema(
  { store : String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    itemsIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      }
    ],
  },

  {
    timestamps: true,
    versionKey: false,
  }

);

module.exports = model("List", listSchema);
