const express = require("express");
const router = express.Router();

//controller
const ContentController = require("../controller/contentController");
const ImageController = require("../controller/ImageController");
//middleWare
const ImageUploader = require("../middlewares/ImageUploader");
const authMiddleware = require("../middlewares/auth-middleware");


// 게시글 작성 API
router.post('/', authMiddleware, ImageUploader.fields([{ name: 'images', maxCount: 5 }]), ContentController.writeContent);


// 게시글 조회 API
router.get('/', ContentController.ContentList);


// 게시글 찾기 API
router.get('/search', ContentController.SearchContent);


// 게시글 수정 API(put)
router.patch('/:postId', authMiddleware, ContentController.modifyContent);

//이미지 업로드
router.post('/postImage', authMiddleware, ImageUploader.fields([{ name: 'images', maxCount: 5 }]), ImageController.PostImage)

//이미지 가져오기
router.get('/postImage/:key', authMiddleware, ImageController.GetImages)

// ******************************************************************
// 게시글 삭제 API(email, articleId 같이 맞으면 삭제)
router.delete('/:postId', authMiddleware, ContentController.deleteContent);

module.exports = router;
module.exports = router;