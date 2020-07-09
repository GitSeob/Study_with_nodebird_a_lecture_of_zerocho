module.exports = (sequelize, DataTypes) =>{
    const Hashtag = sequelize.define('Hashtag', {
        name:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })

    Hashtag.associate = (db) =>{
        db.Hashtag.belongsTo(db.Post, {through: 'PostHashtag'}) 
        // 다대다 관계 => 중간 테이블 생성, through에 table 이름 적어준다.
    }

    return Hashtag
}