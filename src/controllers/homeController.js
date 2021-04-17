const { User, sequelize } = require('../database/models');

const homeController = {

    home: async (req, res) => {
        let users;
        try {

            users = await User.findAll();

        } catch (error) {
            console.log(error);
        }

        // res.send(users);

        res.render('home', { title: 'Prueba Técnica aycron', users });
    }

};

module.exports = homeController;