const express = require('express')
const db = require('../models')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { isLoggedIn } = require('./middleware')
const router = express.Router()

//기본 주소가 /api/user/ 이다.
router.get('/', isLoggedIn, (req, res)=>{
    const filteredUser = Object.assign({}, req.user.toJSON())
    delete filteredUser.password
    return res.json(filteredUser)
})
router.post('/', async(req, res, next)=>{ // POST /api/user 회원가입  
    try {
        const exUser = await db.User.findOne({ // 하나만 찾기
            where: {
                userId: req.body.userId,
            }
        }) // 비동기이기 때문에 async await사용
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.') // 400~599사이의 숫자로 알려주어야 error인줄 안다. 200 성공 300 리다이렉션 400 요청오류 500 서버오류
        } // 기존 id 사용자가 존재하면 error 반환
        const hashedPassword = await bcrypt.hash(req.body.password, 12) //뒤의 숫자가 커질 수록 보안이 높아지지만 너무 높아지면 비밀번호 생성시간이 길어짐 보통 10~13
            // bcrypt를 이용하여 비밀번호를 암호화
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword
        }) // 새로운 데이터 생성
        return res.json(newUser) // front로 보내줌
    } catch(e){
        console.error(e)
        // return res.status(403).send(e)
        return next(e) // 이렇게 쓰면 알아서 프론트에 에러를 알려줌 but 그냥 그대로 전달해주어서 위에서 에러처리를 해주어야 함
    } // 에러가능성 있기에 try catch 문 사용
    

})
router.get('/:id', async (req, res, next)=>{ // 남의 정보 가져오기 - :(콜론)은 변수라고 생각하면 된다.(와일드카드) ex) /api/user/anjoy => id = anjoy
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10) },
            include: [{
                model: db.Post,
                as: 'Posts',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followers',
                attributes: ['id'],
            }],
            attributes: ['id', 'nickname'],
        });
        const jsonUser = user.toJSON();
        jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
        jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
        jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
        res.json(jsonUser);
    } catch (e) {
        console.error(e);
        next(e);
    }
})



router.post('/logout', (req, res)=> {
    req.logout()
    req.session.destroy()
    res.send('logout 성공')
})
router.post('/login', (req, res, next)=> {
    passport.authenticate('local', (err, user, info)=>{ // 서버에러, 유저정보, 로직상에러
        if(err){
            console.error(err)
            return next(err)
        }
        if(info){
            return res.status(401).send(info.reason)
        }
        return req.login(user, async (loginErr)=>{
            try {
                if(loginErr){
                    return next(loginErr)
                }
                const fullUser = await db.User.findOne({
                    where: {id : user.id},
                    include: [{  // 
                        model: db.Post,
                        as: 'Posts', // as 로 이름 붙힌 거면 as꼭 넣어줘야함
                        attributes: ['id'],
                    }, {
                         model: db.User,
                        as: 'Followings',
                        attributes: ['id'],
                    }, { 
                        model: db.User,
                        as: "Followers",
                        attributes: ['id'],
                    }],
                    attributes: ['id', 'nickname', 'userId'] // 전달 인자를 설정해서 보내준다 (password 제외!)
                })
                return res.json(fullUser)
                // const filteredUser = Object.assign({}, user.toJSON())
                // delete filteredUser.password // 프론트에 비밀번호를 전달하면 위험하기 때문에 delete를 이용하여 user 객체 안의 password를 지워주고 보내준다.
                // console.log(filteredUser)
                // return res.json(filteredUser)
            } catch(e){
                next(e)
            }
        })
    })(req, res, next)
})
router.get('/:id/follow', (req, res)=> {

}) // 팔로우 목록 가져오기
router.post('/:id/follow', (req, res)=> {

}) // 팔로우 등록
router.delete('/:id/follow', (req, res)=> {

}) // 팔로우 취소
router.delete('/:id/follwer', (req, res)=> {

}) // 팔로워 삭제
router.get('/:id/posts', async (req, res, next)=> {
    try {
        const posts = await db.Post.findAll({
          where: {
            UserId: parseInt(req.params.id, 10),
            RetweetId: null,
          },
          include: [{
            model: db.User,
            attributes: ['id', 'nickname'],
          }, {
            model: db.Image,
          }] 
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
}) // 포스트 불러오기

module.exports = router