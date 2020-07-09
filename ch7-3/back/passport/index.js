const passport = require('passport')
const db = require('../models')
const local = require('./local')

module.exports = () => {
    passport.serializeUser((user, done)=>{ // 서버쪽에 [{id: 3, cookie: 'asdsdaf'}] 처럼 배열(가벼운 객체)로 보내줌 => 사용자에 대한 정보가 너무 많기 때문에 시리얼라이즈해서 서버 메모리에서 간단하게 저장한다. 프론트에서는 쿠키로 .. 
        return done(null, user.id)
    })

    passport.deserializeUser(async (id, done)=>{ // 시리얼라이즈 된 id를 이용하여 다시 유저의 정보를 서버로 가져온다
        try{
            const user = await db.User.findOne({
                where: {id},
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
            })
            return done(null, user) // req.user
        } catch(e){
            console.error(e)
            return done(e)
        }
    })

    local()
}
// cookie와 session으로 로그인 하는 순서 

// 프론트에서 서버로는 cookie만 보낸다.
// 서버가 쿠키파서, express-session으로 쿠키 검사 후 ex)id: 3 발견
// id: 3이 deserializeUser에 들어감
// req.user로 사용자 정보가 들어감

// 요청 보낼때마다 deserializeUser가 실행된다(서버자원을 제일 많이 차지함)
// 실무에서는 deserializeUser 결과를 캐싱한다.