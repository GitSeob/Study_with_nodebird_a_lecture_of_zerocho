const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () =>{
    passport.use(new LocalStrategy({
        usernameField: "userId",
        passwordField: "password",
    }, async (userId, password, done)=> {
        try{    
            const user = await db.User.findOne({
                where: {
                    userId
                }
            }) // 기존 사용자 체크
            if(!user){
                return done(null, false, { reason: '존재하지 않는 사용자입니다.' })
            } // 사용자 없으면 돌려보냄
            const result = await bcrypt.compare(password, user.password)
            if(result){
                return done(null, user)
            } // 비밀번호가 일치하면 성공 보냄
            return done(null, false, {reason: '비밀번호가 틀립니다.'}) // 비밀번호가 다르면 돌려보냄
        } catch(e){
            console.error(e)
            return done(e)
        }
    }))
    // done(에러, 정보, 로직상 에러 전달 정보)
}

