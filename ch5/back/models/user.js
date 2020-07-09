module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('User', { // 이름을 대문자 시작으로 쓰면 User => users 처럼 자동 변환이 된다.
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    },{
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })

    User.associate = (db) => {
        db.User.hasMany(db.Post, { as: 'Posts' })
             // 밑의 belongsToMany와 구별하기 위해 한쪽에 이름 부여
        db.User.hasMany(db.Comment)
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })  
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' })  // as - JS 객체에서 사용하는 이름 , foreignKey - db에서 사용하는 컬럼명
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' })  // followers와 followings 는 컬럼이 곂치기 때문에 foreign key 생성시켜주어야 한다
            // belongsToMany는 웬만하면 다 이름을 달아주는 것이 좋다.
    }

    return User
}