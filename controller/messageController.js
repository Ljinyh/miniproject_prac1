const Message = require("../models/Message");
const CONV = require("../models/conversation");

//메세지 저장
async function PostMessages(req, res) {
    const { userId } = res.locals.user;
    const { conversationId } = req.params;
    const { text } = req.body;

    const NewMessage = new Message({ userId, conversationId, text });

    try {
        await NewMessage.save();
        return res.status(200).json({ NewMessage, result: "success!" });
    } catch (error) {
        res.staus(500).json({ msg: "Error!" });
    }
};

//메세지 조회
async function GetMessages(req, res) {
    const { conversationId } = req.params;

    const FindCONV = await Message.find({ conversationId });
    try {
        if (FindCONV) {
            res.status(200).json({ FindCONV, msg: "가져오기 성공!" })
        };
    } catch (error) {
        res.status(500).json({ msg: "NOT have Message or another Error!" });
    }
};

module.exports.PostMessages = PostMessages;
module.exports.GetMessages = GetMessages;