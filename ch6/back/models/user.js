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
        db.User.hasMany(db.Post, { as: 'Posts' });
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
    }

    return User
}