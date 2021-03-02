// Dependencies
const bcrypt = require('bcryptjs'); // Alternative depency because BCRYPT IS SSSSSS
const jwt = require('jsonwebtoken'); // Librairie pour utilisation token avec la norme 'jwt'
const mysql = require('../middleware/database').connection;
const salt = bcrypt.genSaltSync(10); // ..because YMCA
require('dotenv').config(); // Accès pour récupérer les données dans .env

exports.modify = (req, res, next) => {
    const userID = res.locals.userID;
    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const newPassword = req.body.new_password;

    let query_user_find = `     SELECT  users.password
                                FROM    users
                                WHERE   users.id = '${userID}'  `;
    let query_user_modify = `   UPDATE  users
                                SET     users.email = '${email}',
                                        users.first_name = '${first_name}',
                                        users.last_name = '${last_name}'
                                WHERE   users.id = '${userID}'  `;
console.log(req.body);
    mysql.query(query_user_find, function(err, result) {
        if (result.length == 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        } else {
            console.log(password);
            bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    } else {
                        if (newPassword) { // Si un nouveau mdp est défini
                            bcrypt.hash(newPassword, salt)
                                .then(hash => {
                                    const query_update_pword = `UPDATE  users
                                                                SET     users.password = '${hash}',
                                                                        users.email = '${email}',
                                                                        users.first_name = '${first_name}',
                                                                        users.last_name = '${last_name}'
                                                                WHERE   users.id = '${userID}'  `;
                                    mysql.query(query_update_pword, function(err, result) {
                                        if (result.affectedRows == 0) {
                                            return res.status(400).json({ message: "Changement échoué !" });
                                        } else {
                                            res.status(200).json({ message: "Changement réussi !" });
                                        }
                                    });
                                })
                                .catch(e => res.status(502).json(e));
                        } else { // Si le mdp reste le même
                            mysql.query(query_user_modify, function(err, result) {
                                if (result.affectedRows == 0) {
                                    return res.status(400).json({ message: "Changement échoué !" });
                                } else {
                                    res.status(200).json({ message: "Changement réussi !" });
                                }
                            });
                        }
                    }
                })
                .catch(e => res.status(503).json(e));
        }
    });
}

exports.profile = (req, res, next) => {
    const userID = res.locals.userID;
    let query = `   SELECT  users.email,
                            users.first_name,
                            users.last_name,
                            DATE_FORMAT(created, '%e %M %Y à %kh%i') AS created
                    FROM    users
                    WHERE   users.id = '${userID}'  `;
    mysql.query(query, function(err, result) {
        if (result.length == 0) {
            return res.status(400).json({ message: "Aucun utilisateur ne correspond à votre requête" });
        } else {
            res.status(200).json(result);
        }
    });
}

exports.delete = (req, res, next) => {
    const password = req.body.password;
    const userID = res.locals.userID;
    let query_find = `  SELECT users.password
                        FROM users
                        WHERE users.id = '${userID}'  `;
    let query_delete = `DELETE FROM users
                        WHERE users.id = '${userID}' `;
    mysql.query(query_find, function(err, result) {
        if (result.length == 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        } else {
            bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    mysql.query(query_delete, function(err, result) {
                        if (result.affectedRows == 0) {
                            return res.status(400).json({ message: "Suppression échouée" });
                        } else {
                            res.status(200).json({ message: "Utilisateur supprimé !" });
                        }
                    });
                })
                .catch(e => res.status(501).json(e));
        }
    });
}

// Création utilisation
const userSignUp = (req, res, next) => {
    //var hash = bcrypt.hashSync("B4c0/\/", salt);
    bcrypt.hash(req.body.password, salt) // Crypte le 'password' et augmente la complexité à 10
        .then(hash => {
            const email = req.body.email;
            const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            const password = hash;
            let query = `   INSERT INTO users
                            SET     email = '${email}',
                                    first_name = '${first_name}',
                                    last_name = '${last_name}',
                                    password = '${password}',
                                    created = NOW()  `;
            console.log(query);
            mysql.query(query, function(err, result) {
                if(err){
                    return res.status(409).json({ error: err });
                }else{
                    console.log(result.affectedRows);
                    if (result.affectedRows === 1) {
                        console.log("created");
                        res.status(200).json({ message: 'L\'utilisateur a été créé !' });
                    } else {
                        console.log("nope");
                        res.status(501).json({ message: 'Fluck!' });
                    }
                }
            });
        })
        .catch(error => res.status(501).json({ error }));
};

// Connexion utilisateur
const userLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const query = ` SELECT  users.id,
                            users.password,
                            users.permission
                    FROM    users
                    WHERE   users.email = '${email}'  `;
    console.log(query);
    mysql.query(query, function(err, result) {
        //console.log(result.affectedRows);
        console.log(result);
        if (result.length == 0) {
            console.log("no user found");
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        } else {
            console.log("user found");
            console.log("password:" + password);
            console.log("passwordDB:" + result[0].password);
            bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }else{
                        res.status(200).json({
                            userID: result[0].id,
                            role: result[0].permission,
                            token: jwt.sign(
                                { userID: result[0].id },
                                process.env.RANDOM_TOKEN_SECRET, 
                                { expiresIn: "24h" }
                            )
                        });
                    }
                })
                .catch(e => res.status(504).json(e));
        }
        console.log(err);
    });
};

exports.userSignUp = userSignUp; // Export objet userSignUp en le rendant disponible 
exports.userLogin = userLogin; // Export objet userLogin en le rendant disponible