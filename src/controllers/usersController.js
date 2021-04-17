const { User, sequelize } = require('../database/models');
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const usersController = {

    userLogin: (req, res) => {

        res.render('users/userLogin', { title: 'Login de Usuarios' });
    },

    processLogin: async (req, res) => {

        try {
            let users = await User.findAll();

            let userEmail = req.body.username;
            let userPass = req.body.password;
            // usuarioPass = bcrypt.hashSync(usuarioPass, 10)

            let user = await User.findAll({
                where: { username: userEmail }
            })
            //   console.log(user)                                                        

            if (user == "") {
                let error = "Usuario no encontrado."
                res.render("users/userLogin", { title: "Login de usuarios", error, userEmail })

            } else if (bcryptjs.compareSync(userPass, user[0].password)) {

                req.session.loggedUser = user[0];

                res.redirect('/');

            } else {

                let error = "Contraseña incorrecta."
                res.render("users/userLogin", { title: "Login de usuarios", error, userEmail })
            }


        } catch (error) {
            console.log(error)
        }

    },

    userLogout: (req, res) => {
        req.session.loggedUser = null;

        res.redirect('/');
    },

    userCreate: (req, res) => {

        res.render('users/userCreate', { title: 'Crear Usuario Nuevo' });
    },

    processCreate: async (req, res) => {

        if (req.file == "Bad") {
            res.send("El archivo ya existe o el formato de archivo no fue aceptado. Cargue PDF, DOC o DOCX")
        } else {

            let newUserData = req.body;
            req.file != undefined ? newUserData.cv = req.file.originalname : "";
            newUserData.password = bcryptjs.hashSync(newUserData.password, 10);
            // res.send(newUserData);  

            try {

                let user = await User.findAll({
                    where: {
                        username: newUserData.username,
                    }
                });

                if (user != "") {

                    res.json("Email de usuario no disponible");

                } else {
                    await User.create(newUserData);
                    let users = await User.findAll();

                    res.render('home', { title: 'Prueba Técnica aycron', users, msg: '¡Usuario creado con éxito!' });
                    // res.redirect('/');

                }
            } catch (error) {

                console.log(error);

            }
        }


    },

    deleteUser: async (req, res) => {

        let id = req.params.id;

        try {

            let user = await User.findByPk(id);

            if (user.cv != null) {
                fs.unlinkSync(path.join(__dirname, '../../public/files', user.cv));
            }

            await User.destroy(
                {
                    where: { id_user: id }
                }
            );

            res.redirect('/');

        } catch (error) {
            console.log(error)
        }


    },

    getFile: (req, res) => {
        // res.send(req.body.file)

        res.sendFile(path.join(__dirname, '../../public/files/', req.body.file))

    },


};

module.exports = usersController;