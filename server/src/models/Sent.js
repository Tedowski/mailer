module.exports = (sequelize, DataTypes) => {
    const Sent = sequelize.define('Sent', {
        receiver: DataTypes.STRING,
        subject: DataTypes.STRING,
        text: DataTypes.TEXT,
    });

    Sent.associate = (models) => {
        // associations can be defined here
        Sent.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'author',
            onDelete: 'CASCADE',
        });
    };

    return Sent;
};
