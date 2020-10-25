const { Schema, model } = require("mongoose");
const itemSchema = new Schema(
    {
        itemName: String,
        quantity: Number,
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        listId: [
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

module.exports = model("Item", itemSchema);
