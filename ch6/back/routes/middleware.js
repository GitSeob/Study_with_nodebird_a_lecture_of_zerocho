exports.isLoggedIn = (req, res, next) =>{
    if(req.isAuthenticated()){
        next() // 에러를 넣지 않으면 다음 미들웨어로 넘어간다.
    }
    else{
        res.status(401).send('로그인이 필요합니다')
    }
} 

exports.isNotLoggedIn = (req, res, next)=> {
    if(!req.isAuthenticated()){
        next()
    }
    else{
        res.status(401).send('로그인한 사용자는 이용이 불가합니다.')
    }
}