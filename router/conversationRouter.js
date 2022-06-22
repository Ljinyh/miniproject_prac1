const router = require("express").Router();
const authMiddleware = require("../middlewares/auth-middleware");
const CONVController = require("../controller/conversationController");

//새로운대화 저장
router.post("/", authMiddleware, CONVController.PostConversations);


//대화방 가져오기
router.get("/", authMiddleware, CONVController.GetUsersConv);

//대화 삭제
router.delete("/:receiverId", authMiddleware, CONVController.DeleteCONV);

module.exports = router;