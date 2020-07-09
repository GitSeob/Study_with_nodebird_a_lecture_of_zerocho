module.exports = (sequelize, DataTypes) =>{
    const Post = sequelize.define('Post',{
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

    Post.associate = (db) =>{
        db.Post.belongsTo(db.User) // hasMany의 역 = User에 속해있음 - 테이블에 UserId 컬럼이 생성된다
        db.Post.hasMany(db.Comment)
        db.Post.hasMany(db.Image)
        db.Post.belongsTo(db.Post, { as: 'Retweet'}) // RetweetId 컬럼 생성
            // retweet 관계, 이름이 같으므로 구분하기 위해 as로 이름을 줌
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' })
            // 다대다 관계 
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' })   
            // 다대다 관계 
        
    }

    return Post
}