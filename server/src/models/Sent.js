module.exports = (sequelize, DataTypes) => {
    const Sent = sequelize.define('Sent', {
        from: DataTypes.STRING,
        to: DataTypes.STRING,
        subject: DataTypes.STRING,
        text: DataTypes.TEXT,
    });

    return Sent;
};
