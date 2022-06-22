const ImageUploader = require("../middlewares/ImageUploader");


//이미지 넣기
async function PostImage(req, res) {
    const images = req.files['images'][0];

    console.log(images);
    res.status(200).send({ images, msg: "성공" });
};

//이미지 불러오기
async function GetImages(req, res) {
    const { key } = req.params;
    const fileStream = ImageUploader.getObject(key).createReadStream();
    fileStream.pipe(res);
}

module.exports.PostImage = PostImage;
module.exports.GetImages = GetImages;