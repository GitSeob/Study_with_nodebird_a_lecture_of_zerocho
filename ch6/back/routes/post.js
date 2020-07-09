const express = require('express')
const multer = require('multer')
const path = require('path')
const db = require('../models')
const { isLoggedIn } = require('./middleware')

const router = express.Router()

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads')
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname) // 확장자 추출
            const basename = path.basename(file.originalname, ext) // 파일 이름 추출
            done(null, basename + new Date() + ext) // 파일 이름 + 시간 + 확장자로 이름 재가공 - 덮어 씌워지는 상황 방지
        }
    }),
    limits: { fileSize: 20*1024*1024 }, // 크기 제한
}) //multer 쓰기전에 옵션 설정 - file upload (image, video, file 등 가능)
// cb()는 passport의 done() 과 비슷하다.

// multer가 image는 req.file로 처리, 이미지 외는 req.body로 처리해주어서 밑의 코드 그대로 사용 가능
router.post('/', isLoggedIn, upload.none(), async (req, res, next)=> { // api/post - post 작성
    try {
        // 로그인 검사 , isLoggedIn 미들웨어에서 로그인 검증하고 아래부터 시작
        const hashtags = req.body.content.match(/#[^\s]+/g) // hashtag 정규 표현식으로 추출
        const newPost = await db.Post.create({
            content: req.body.content, // ex) content = '안홍섭 #존잘' 이면 hashtag를 추출해야 하는데 이것은 코딩의 영역이다.
            UserId: req.user.id,
        })
        
        if(hashtags){
            const result = await Promise.all( // hashtag들을 각각 다 저장을 해주려면 await Promise.all 을 붙혀주어야 한다.
                hashtags.map(tag=>
                    db.Hashtag.findOrCreate({ // findOrCreate - 있으면 찾고 없으면 생성
                        where: {
                            name: tag.slice(1).toLowerCase() // 맨 앞의 # 제거
                        }
                    })
                )  
            ) // tag => {} 이렇게 대괄호 쓰면 해쉬태그 포함 게시글 작성시 에러 발생 .. 왜인지는 모름 ㅠㅠ
            await newPost.addHashtags(result.map(r => r[0])); // newPost에 hashtag들 만든 것들을 연결함, sequelize에서 만들어 준 함수 (add-추가/ remove-제거/ get .. 등을 제공)
        }
        if(req.body.image){
            if(Array.isArray(req.body.image)){ // 이미지 주소를 여러개 올린 경우 배열로 온다.
                const images = await Promise.all(req.body.image.map((image)=>{
                    return db.Image.create({ src: image })
                })) // 동시에 처리 !
                await newPost.addImages(images) 
            }
            else{ // 이미지를 하나만 올리면 배열 x 
                const image = await db.Image.create({ src: req.body.image })
                await newPost.addImage(image)
            }
        }
        
        
        // const User == await newPost.getUser()
        // newPost.User = User
        // res.json(newPost)
        // 아래 fullPost 의 다른 방식

        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [{
              model: db.User,
            }, {
                model: db.Image,
            }],
          });
          return res.json(fullPost);
        } catch (e) {
          console.error(e);
          return next(e);
        }
}) // 게시글 작성


router.post('/images', upload.array('image'), (req, res)=> {
    res.json(req.files.map(v => v.filename))
}) // 이미지 등록하기

router.get('/:id/comments', async (req, res, next)=>{ // 댓글 가져오기
    try{
        const post = await db.Post.findOne({
            where: { id: req.params.id}
        })
        if(!post){
            return res.status(401).send('포스트가 존재하지 않습니다.')
        }
        const comments = await db.Comment.findAll({
            where: {
                PostId: req.params.id
            },
            order: [[ 'createdAt', 'ASC']],
            include: [{
                model: db.User,
                attribute: ['id', 'nickname'],
            }]
        })
        return res.json(comments)
    }catch(e){
        console.errer(e)
        return next(e)
    }
})

router.post('/:id/comment', isLoggedIn, async (req, res, next)=>{ // 댓글 달기
    try{
        // if(!req.user){
        //     return res.status(401).send('로그인이 필요합니다.')
        // } 미들웨어로 중복 처리
        const post = await db.Post.findOne({
            where: { id: req.params.id }
        })
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.')
        } // 게시글 검사
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content
        })
        await post.addComment(newComment.id) // 시퀄라이즈에서 수행
        const comment = await db.Comment.findOne({
            where: {
              id: newComment.id,
            },
            include: [{
              model: db.User,
              attributes: ['id', 'nickname'],
            }],
          });
        return res.json(comment)
    } catch(e){
        console.error(e)
        return next(e)
    }
})

module.exports = router

