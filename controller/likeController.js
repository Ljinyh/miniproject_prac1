const Like = require("../models/like");

//좋아요 기능
async function like(req, res) {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const findLike = await Like.findOne({ postId, userId });
    if (findLike) {
        return res.status(400).send({ errorMessage: "이미 좋아요를 하셨습니다!" })
    }
    const like = await Like.create({
        userId,
        postId,
    });

    return res.status(201).json({ like, msg: "좋아요 완료!" });
}

//좋아요 조회
async function totalLike(req, res) {
    const { postId } = req.params;
    const findAllLike = await Like.find({ postId });
    try {
        res.status(200).json({ findAllLike, Message: "좋아요를 잘 가져왔음!" });
    } catch (error) {
        res.status(400).json({ errorMessage: "좋아요가 없습니다!" })
    };
};

//좋아요 취소
async function deletelike(req, res) {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const findLike = await Like.findOne({ postId, userId });
    try {
        if (!findLike) {
            return res.status(400).send({ errorMessage: "좋아요를 하지 않았습니다." });
        }

        const unLike = await Like.deleteOne(findLike);
        res.status(200).json({ unLike, msg: "좋아요 취소 완료!" });
    } catch (error) {
        res.status(400).json({ errorMessage: "좋아요 삭제 에러!" })
    }
}

module.exports.like = like;
module.exports.totalLike = totalLike;
module.exports.deletelike = deletelike;