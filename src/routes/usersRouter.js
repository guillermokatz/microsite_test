var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// RUTA Y NOMBRE DE ARCHIVO
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/files/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        let fileExists = fs.existsSync(path.join(__dirname, '../../public/files/', file.originalname));
        // console.log(file.mimetype);
        // if (fileExists) {
        //     req.file = "Exists"
        //     cb(null, false);
        // } 

        if (!fileExists && (file.mimetype == 'application/pdf' || file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype == 'application/msword')) {
            cb(null, true);
        } else {
            req.file = "Bad"
            cb(null, false);
        }
    }
});

const usersController = require('../controllers/usersController');

router.get('/login', usersController.userLogin);

router.post('/login', usersController.processLogin);

router.post('/logout', usersController.userLogout);

router.get('/create', usersController.userCreate);

router.post('/create', upload.single('cv'), usersController.processCreate);

router.post('/getFile', usersController.getFile);

router.delete('/:id/delete', usersController.deleteUser);

module.exports = router;
