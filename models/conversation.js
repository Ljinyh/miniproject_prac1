const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array,
    },
}, { timestamps: true });

ConversationSchema.virtual("ConversationId").get(function() {
    return this._id.toHexString();
});
ConversationSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Conversation", ConversationSchema);