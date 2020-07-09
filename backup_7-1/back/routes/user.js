const express = require('express')
const db = require('../models')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { isLoggedIn } = require('./middleware')
const router = express.Router()

//기본 주소가 /api/user/ 이다.
router.get('/', isLoggedIn, (req, res) => { // /api/user/
    const user = Object.assign({}, req.user.toJSON())
    delete user.password
    return res.json(user)
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
            } catch(e){
                next(e)
            }
        })
    })(req, res, next)
})
router.get('/:id/follow', (req, res)=> {

}) // 팔로우 목록 가져오기

router.post('/:id/follow', isLoggedIn, async (req, res, next)=> {
    try{
        const me = await db.User.findOne({
            where: { id: req.user.id },
        })
        await me.addFollowing(req.params.id) // req.user해도 되지만 가끔 시퀄라이즈 객체가 아닌 다른 객체 형식이 반환되어서 me. ~ 로 처리해주었다.
        res.send(req.params.id)
    } catch(e){
        console.error(e)
        next(e)
    }
}) // 팔로우 등록


router.delete('/:id/follow', isLoggedIn, async (req, res, next)=> {
    try{
        const me = await db.User.findOne({
            where: { id: req.user.id },
        })
        await me.removeFollowing(req.params.id)
        res.send(req.params.id)
    } catch(e){
        console.error(e)
        next(e)
    }
}) // 팔로우 취소

router.get('/:id/followings', isLoggedIn, async (req, res, next) => {
    try{
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 }, // id가 0인 경우에는 req.user.id 로 불러오도록 함
        }) // 타겟을 찾음
        const followings = await user.getFollowings({
            attributes: ['id', 'nickname'], // password 제거를 위함
            limit: parseInt(req.query.limit, 10),
            offset: parseInt(req.query.offset, 10),
        }) // 타겟에서 follower 추출
        res.json(followings)
    } catch(e){
        console.error(e)
        next(e)
    }
})

router.get('/:id/followers', isLoggedIn, async (req, res, next) => {
    try{
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0},
        }) // 타겟을 찾음
        const followers = await user.getFollowers({
            attributes: ['id', 'nickname'], // password 제거를 위함
            limit: parseInt(req.query.limit, 10),
            offset: parseInt(req.query.offset, 10),
        }) // 타겟에서 follower 추출
        res.json(followers)
    } catch(e){
        console.error(e)
        next(e)
    }
})

router.delete('/:id/follwer', isLoggedIn, async (req, res, next)=> {
    try{
        const me = await db.User.findOne({
            where: { id: req.user.id },
        })
        await me.removeFollower(req.params.id)
        res.send(req.params.id)
    } catch(e){
        console.error(e)
        next(e)
    }
}) // 팔로워 삭제

router.get('/:id/posts', async (req, res, next)=> {
    try {
        const posts = await db.Post.findAll({
          where: {
            UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 ,
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

router.patch('/nickname', async (req, res, next)=>{
    try{
        await db.User.update({
            nickname: req.body.nickname,
        }, {
            where: { id: req.user.id },
        })
        res.send(req.body.nickname)
    } catch(e){
        console.error(e)
        next(e)
    }
})

module.exports = router