const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
    },
    userId: {
        type: String,
    },
    text: {
        type: String,
    },
}, { timestamps: true });

MessageSchema.virtual("MessageId").get(function() {
    return this._id.toHexString();
});
MessageSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Message", MessageSchema);