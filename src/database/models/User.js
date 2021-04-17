module.exports = (sequelize, DataTypes) => {
    let alias = "User";

    let cols = {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        cv: DataTypes.STRING
    };

    let User = sequelize.define(alias, cols);

    return User;

};