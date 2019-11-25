const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));


// creates hasher function using bcrypt - bcrypt syntax
function hashPassword (user) {
    const SALT_FACTOR = 8;

    if (!user.changed('password')) {
        return;
    }

    // eslint-disable-next-line consistent-return
    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then((salt) => bcrypt.hashAsync(user.password, salt, null))
        .then((hash) => {
            user.setDataValue('password', hash);
        });
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
    }, {
        hooks: { // hooks that define when the hasher should hash the password
            // when we create new user and when we update existing user
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
        },
    });

    User.associate = (models) => {
        // associations can be defined here
        User.hasMany(models.Sent, {
            foreignKey: 'user_id',
            as: 'sents',
            onDelete: 'CASCADE',
        });
    };

    // create compare password method on the class so we can use it on
    // individual user objects when checking their login details
    User.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.password);
    };

    return User;
};
