const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
    userId: String,
    postId: String,
}, { timestamps: true });

const Like = mongoose.model('Like', LikeSchema);

LikeSchema.virtual("likeId").get(function() {
    return this._id.toHexString();
});
LikeSchema.set("toJSON", { virtuals: true });

module.exports = Like;