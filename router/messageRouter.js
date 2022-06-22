const router = require("express").Router();
const authMiddleware = require("../middlewares/auth-middleware");
const messageController = require("../controller/messageController");

router.post('/:conversationId', authMiddleware, messageController.PostMessages);

router.get('/:conversationId', authMiddleware, messageController.GetMessages);


module.exports = router;