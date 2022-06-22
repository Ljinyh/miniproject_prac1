const CONV = require("../models/conversation");

//대화방 생성
async function PostConversations(req, res) {
    const { userId } = res.locals.user;
    const { receiverId } = req.body;
    const newCONV = new CONV({
        members: [receiverId, userId],
    });

    try {
        if (!receiverId) {
            const savedCONV = await newCONV.save();
            return res.status(200).json({ savedCONV, result: "success!" })
        }
        return res.status(400).json({ errorMessage: "이미 대화방이 있습니다!" })
    } catch (err) {
        res.status(500).json("Error!");
    };
};

//대화방 가져오기
async function GetUsersConv(req, res) {
    const { userId } = res.locals.user;

    const FindCONV = await CONV.find({
        members: { $in: userId },
    });

    try {
        if (FindCONV) {
            res.status(200).json({ result: "success!", FindCONV });
        }
    } catch (error) {
        res.status(500).json("Error!")
    }

};

// 대화방 삭제
async function DeleteCONV(req, res) {
    const { receiverId } = req.params;

    const FindCONV = await CONV.find({
        members: { $in: receiverId },
    });

    console.log(FindCONV)

    try {
        if (FindCONV[0].members[0] !== receiverId || FindCONV.length === 0) {
            return res.status(400).json({ errorMessage: "대화상대가 없습니다!" });
        }

        await CONV.deleteOne({ FindCONV });

        res.status(200).json({ msg: "대화를 성공적으로 삭제하였습니다!" });

    } catch (error) {
        res.status(500).json("Error");
    };
};


module.exports.PostConversations = PostConversations;
module.exports.GetUsersConv = GetUsersConv;
module.exports.DeleteCONV = DeleteCONV;