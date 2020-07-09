const express = require('express')
const db = require('../models')

const router = express.Router()

router.post('/', async (req, res, next)=> { // api/post - post 작성
    try {
        const hashtags = req.body.content.match(/#[^\s]+/g) // hashtag 정규 표현식으로 추출
        const newPost = await db.Post.create({
            content: req.body.content, // ex) content = '안홍섭 #존잘' 이면 hashtag를 추출해야 하는데 이것은 코딩의 영역이다.
            UserId: req.body.id,
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
        
        
        // const User == await newPost.getUser()
        // newPost.User = User
        // res.json(newPost)
        // 아래 fullPost 의 다른 방식

        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [{
              model: db.User,
            }],
          });
          res.json(fullPost);
        } catch (e) {
          console.error(e);
          next(e);
        }
}) // 게시글 작성


router.post('/images', (req, res)=> {

}) // 이미지 등록하기

module.exports = router

