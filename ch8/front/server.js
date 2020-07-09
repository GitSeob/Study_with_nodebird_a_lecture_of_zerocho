// next는 와일드카드를 사용할 수 없기 때문에 프론트 단에서도 express를 사용하여
// next와 express를 연결해준다.

const express = require('express')
const next = require('next')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const dotenv = require('dotenv')
const path = require('path');
const favicon = require('serve-favicon')

const dev = process.env.NODE_ENV !== 'production'
const prod = process.env.NODE_ENV === 'production'

const app = next({ dev })
const handle = app.getRequestHandler()
dotenv.config()

app.prepare().then(()=>{
    const server = express()

    server.use(morgan('dev'))
    server.use('/', favicon(path.join(__dirname, '/public', 'favicon.ico')));
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }))
    server.use(cookieParser(process.env.COOKIE_SECRET))
    server.use(expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie:{
            httpOnly: true,
            secure: false,
        }
    }))

    server.get('/post/:id', (req, res)=>{
        return app.render(req, res, '/post', { id: req.params.id })
    })

    server.get('/hashtag/:tag', (req, res)=>{
        return app.render(req, res, '/hashtag', { tag: req.params.tag })
    })

    server.get('/user/:id', (req, res)=>{
        return app.render(req, res, '/user', { id: req.params.id })
    })

    server.get('*', (req, res)=>{ // *은 모든 요청
        return handle(req, res)
    })

    server.listen(3060, ()=>{
        console.log("next + express running on port 3060")
    })
})