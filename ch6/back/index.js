const express = require("express")
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const dotenv = require('dotenv')
const passport = require('passport')

const passportConfig = require('./passport')
const db = require( './models')
const userAPIRouter = require('./routes/user')
const postAPIRouter = require('./routes/post')
const postsAPIRouter = require('./routes/posts')
const hashtagAPIRouter = require('./routes/hashtag')

dotenv.config() // 같은 경로의 .env 파일 읽음

const app = express()
db.sequelize.sync()
passportConfig()

app.use(morgan('dev')) // 요청들어오면 log가 남음
app.use('/', express.static('uploads')) // uploads 폴더를 다른 서버에서 자유롭게 가져갈 수 있게 해준다
app.use(cors({
    origin: true, // 요청 주소랑 같게
    credentials: true, // 서버쪽에서도 쿠키 주고받을 수 있게
})) // 다른 서버에서 요청을 받을 수 있게 허용하게 해준다. 추가안하면 서버에서 거절함
app.use(express.json()) // json 사용하기 위해
app.use(express.urlencoded({ extended: true })) // form형식으로 전달하기 위해
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(expressSession({
    resave: false, // 매번 새션 강제 저장
    saveUninitialized: false, // 빈 값도 저장
    secret: process.env.COOKIE_SECRET, // 쿠키 보안코드
    cookie: {
        httpOnly: true, // 자바스크립트에서 쿠키에 접근 불가 옵션
        secure: false, // https를 쓸 때 true로 해주면 된다.
    },
    name: 'reactnodebird' // cookie이름을 바꿔야함 conect.sid면 express를 쓰는 걸 들킨다
}))
// 쿠키랑 세션 미들웨어 붙임

app.use(passport.initialize())
app.use(passport.session())
// passport 세션은 express세션 뒤에 붙혀야함.
// 미들웨어간 의존관계가 있는 경우 순서가 중요하다.

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/api/user', userAPIRouter)
app.use('/api/post', postAPIRouter)
app.use('/api/posts', postsAPIRouter)
app.use('/api/hashtag', hashtagAPIRouter)
// 코드가 너무 길어져서 분리해준다.

app.listen(3065, ()=>{
    console.log("server is running on localhost:3065")
})