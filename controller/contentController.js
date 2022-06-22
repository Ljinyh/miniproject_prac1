const Content = require("../models/content");
const moment = require("moment");
const AWS = require('aws-sdk');

require("dotenv").config();

// 게시글 목록 조회 API
async function ContentList(req, res) {
    const contentList = await Content
        .find()
        .sort({ CreateAt: 'desc' })

    res.status(200).json(contentList);
};


// 게시글 작성 API
async function writeContent(req, res) {
    const { userId } = res.locals.user;
    const { title, content, price } = req.body;

    //이미지 S3에 업로드
    const { images } = req.files;
    const imageURL = images.map(imageURL => imageURL.location);

    const postContent = await Content.create({
        userId,
        title,
        content,
        price,
        imageURL

    });

    return res.status(201).json({ postContent, msg: '글이 작성되었습니다!', });
};



// 게시글 수정 API(patch) -- 진행중
async function modifyContent(req, res) {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content, updateAt, } = req.body;

    const { images } = req.files;

    const imageURLs = findContent.imageURLs.map(imageURL => imageURL.split('com/')[1]);
    const s3 = new AWS.S3();
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Delete: { Objects: imageURLs.map(imageKey => ({ Key: imageKey })) }
    };

    s3.deleteObjects(params, function(err, data) {
        if (err) console.log(err, err.stack); // error
        else { console.log("삭제되었습니다") }; // deleted
    });

    const imageURL = images.map(imageURL => imageURL.location);

    if (userId !== findContent.userId) {
        await res.status(400).json({ errorMessage: "접근 권한이 없습니다!" })
    }

    const modifyPosting = await Content.findByIdAndUpdate(postId, {
        $set: { title: title, content: content, updateAt: updateAt, imageURL: imageURL },
    });
    res.status(201).json({
        modifyPosting,
        msg: '글이 수정되었습니다.',
    });
};


// 게시글 삭제 API
async function deleteContent(req, res) {
    const { userId } = res.locals.user
    const { postId } = req.params;

    const findContent = await Content.findById(postId);

    //S3에서 이미지 삭제
    const imageURL = findContent.imageURL.map(imageURL => imageURL.split('com/')[1]);
    console.log(imageURL)

    if (userId !== findContent.userId) {
        return res.status(400).json({ errorMessage: "접근 권한이 없습니다!" })
    }

    if (findContent) {
        const s3 = new AWS.S3();
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Delete: { Objects: imageURL.map(imageKey => ({ Key: imageKey })) }

        };
        console.log(params.Delete)

        s3.deleteObjects(params, function(err, data) {
            if (err) console.log(err, err.stack); // error
            else { console.log("S3에서 삭제되었습니다") }; // deleted
        });

        //DB에서 게시물 삭제
        if (findContent) {
            await Content.findByIdAndDelete(postId);

            res.status(200).json({
                result: 'success',
                msg: '글이 삭제되었습니다.',
            });
        };
    };
};


//게시물 검색기능
async function SearchContent(req, res) {
    const { value } = req.query;
    const SearchContent = await Content
        .find({ content: new RegExp(value) }).sort({ CreateAt: 'desc' });

    if (!SearchContent || SearchContent[0] === undefined || value === "" || !value) {
        return res.status(400).json({ errorMessage: "검색 옵션이 없습니다." })
    }

    if (SearchContent) {
        return res.status(200).send({ SearchContent, msg: "검색완료!" })
    };
};

module.exports.SearchContent = SearchContent;
module.exports.writeContent = writeContent;
module.exports.ContentList = ContentList;
module.exports.modifyContent = modifyContent;
module.exports.deleteContent = deleteContent;