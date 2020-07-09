const express = require('express')
const db = require('../models')

const router = express.Router()

router.get('/:tag', async (req, res, next) => {
    try{
        const posts = await db.Post.findAll({
            include: [{
                model: db.Hashtag,
                where: {name: decodeURIComponent(req.params.tag)} // 한글, 특수문자가 주소로 갈경우 uri컴포넌트로 바뀌기 때문에 서버쪽에서 제대로 처리해주기 위해 해당 함수를 사용해준다
            }, {
                model: db.User,
                attribute: ['id', 'nickname']
            }, {
                model: db.Image, 
            }]
        })
        res.json(posts)
    } catch(e){
        console.error(e)
        next(e)
    }
})

module.exports = router;