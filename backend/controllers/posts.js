const mysql = require('../middleware/database').connection;
const fs = require("fs"); // accéder au fichier pour le supprimer
require('dotenv').config(); // Accès pour récupérer les données dans .env

exports.addPost = (req, res, next) => {
    const userID = res.locals.userID;
    const content = mysql.escape(req.body.content);
    let file_id;
    console.log(req.file);

    //if (req.file.filename != null) {
    if (req.file.filename !== void 0) {
        const filename = req.file.filename;
        const mimetype = req.file.mimetype;
        const query_filename = `INSERT INTO files
                                SET     files.name = '${filename}',
                                        files.type = '${mimetype}',
                                        files.added = NOW()  `;
        console.log(query_filename);
        mysql.query(query_filename, function(err, result) {
            console.log(result.insertId);
            file_id = result.insertId;
            const query_post = `    INSERT INTO posts
                                    SET     posts.content = ${content},
                                            posts.posted = NOW(),
                                            posts.file_id = '${file_id}',
                                            posts.user_id = '${userID}'  `;
            console.log(query_post);
            mysql.query(query_post, function(err, result) {
                console.log(result);
                if (result.length == 0) {
                    return res.status(400).json({ message: "Not'tin bro !" });
                } else {
                    res.status(201).json({ message: "Post crée !" });
                }
            });
        });
    } else {
        return res.status(400).json({ message: "Pas d'image... Tu dégage!!!" });
    }
}

exports.getAllPosts = (req, res, next) => {
    const userID = res.locals.userID;
    const query = ` SELECT      posts.id AS postID,
                                DATE_FORMAT(posts.posted, 'le %e %M %Y à %kh%i') AS posted,
                                posts.content,
                                users.first_name,
                                users.last_name,
                                (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id AND likes.user_id = '${userID}') AS me_like,
                                (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS likes,
                                (SELECT files.name FROM files WHERE files.id = posts.file_id) AS filename,
                                (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) AS comments,
                                posts.user_id
                    FROM        posts,
                                users
                    WHERE       users.id = posts.user_id
                    ORDER BY    posts.posted DESC  `;
    console.log(query);
    mysql.query(query, function(err, result) {
        if (result.length == 0) {
            return res.status(400).json({ message: "Aucun post à afficher !" });
        } else {
            res.status(200).json(result);
        }
    });
}

exports.getOnePost = (req, res, next) => {
    const userID = res.locals.userID;
    const postID = req.params.id;
    const query_comment = ` SELECT  posts.id AS postID,
                                    posts.content,
                                    DATE_FORMAT(posts.posted, 'le %e %M %Y à %kh%i') AS posted,
                                    files.name AS filename,
                                    users.first_name,
                                    users.last_name,
                                    (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id AND likes.user_id = '${userID}') AS me_like,
                                    (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS likes,
                                    (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) AS comments,
                                    posts.user_id
                            FROM    posts,
                                    users,
                                    files
                            WHERE   users.id = posts.user_id
                            AND     files.id = posts.file_id
                            AND     posts.id = '${postID}'  `;
    mysql.query(query_comment, function(err, result) {
        if (err) {
            return res.status(506).json(err.message);
        } else {
            res.status(200).json(result);
        }
    });
}

exports.deletePost = (req, res, next) => {
    const postID = req.params.id;
    const userID = res.locals.userID;

    let where_admin;
    if (userID != process.env.ADMIN_ID) {
        where_admin = ` AND posts.user_id = '${userID}' `;
    } else {
        where_admin = ``;
    }

    const query_filename = `    SELECT  files.name
                                FROM    files,
                                        posts
                                WHERE   files.id = posts.file_id
                                AND     posts.id = '${postID}'
                                        ${where_admin}   `;
    mysql.query(query_filename, function(err, result) {
        if (result.length == 0) {
            return res.status(400).json({ message: "Aucun post à retirer !" });
        } else {
            const filename = result[0].name;
            fs.unlink(`images/${filename}`, () => { // On supprime le fichier image en amont
                const query_post = `    DELETE          files, posts
                                        FROM            posts
                                        JOIN            files ON posts.file_id = files.id
                                        WHERE           files.id = posts.file_id
                                        AND             posts.id = '${postID}'
                                                        ${where_admin}  `;
                mysql.query(query_post, function(err, result) {
                    if (err) {
                        return res.status(500).json(err.message);
                    };
                    res.status(200).json({ message: "Post supprimé !" });
                });
            });
        }
    });
}

exports.likePostStatus = (req, res, next) => {
    const userID = res.locals.userID;
    const postID = req.params.id;
    const query_count = `   SELECT  COUNT(likes.id) AS count
                            FROM    likes
                            WHERE   likes.post_id = '${postID}'
                            AND     likes.user_id = '${userID}'  `;
    console.log(query_count);
    mysql.query(query_count, function(err, result) {
        if (err) {
            return res.status(504).json(err.message);
        } else {
            if (result[0]['count'] > 0) {
                const query_like = `    DELETE
                                        FROM    likes
                                        WHERE   likes.post_id = '${postID}'
                                        AND     likes.user_id = '${userID}'  `;
                console.log(query_like);
                mysql.query(query_like, function(err, result) {
                    if (err) {
                        return res.status(504).json(err.message);
                    } else {
                        res.status(200).json({ message: "Removed like" });
                    }
                });
            } else {
                const query_like = `    INSERT INTO likes
                                        SET     likes.post_id = '${postID}',
                                                likes.user_id = '${userID}',
                                                likes.liked = NOW()  `;
                console.log(query_like);
                mysql.query(query_like, function(err, result) {
                    if (err) {
                        return res.status(504).json(err.message);
                    } else {
                        res.status(201).json({ message: "Liked it and loved it !" });
                    }
                });
            }
        }
    });
}

exports.getAllComments = (req, res, next) => {
    const postID = req.params.id;
    const query = ` SELECT      DATE_FORMAT(comments.posted, 'le %e %M %Y à %kh%i') AS posted,
                                comments.content,
                                users.first_name,
                                users.last_name,
                                comments.user_id,
                                comments.id
                    FROM        comments,
                                users
                    WHERE       comments.post_id = '${postID}'
                    AND         users.id = comments.user_id
                    ORDER BY    comments.posted DESC  `;
    console.log(query);
    mysql.query(query, function(err, result) {
        if (result.length == 0) {
            //return res.status(200).json({ message: "Aucun post à afficher !" });
            return res.status(200).json();
        } else {
            res.status(200).json(result);
        }
    });
}

exports.addComment = (req, res, next) => {
    const postID = req.params.id;
    const userID = res.locals.userID;
    const content = mysql.escape(req.body.content);
    const query_comment = ` INSERT INTO comments
                            SET     comments.content = ${content},
                                    comments.posted = NOW (),
                                    comments.user_id = '${userID}',
                                    comments.post_id = '${postID}'  `;
    console.log(query_comment);
    mysql.query(query_comment, function(err, result) {
        if (err) {
            return res.status(506).json(err.message);
        } else {
            res.status(201).json({ message: "Commentaire ajouté !" });
        }
    });
}

exports.deleteComment = (req, res, next) => {
    const userID = res.locals.userID;
    const commentID = req.params.cid;

    let where_admin;
    if (userID != process.env.ADMIN_ID) {
        where_admin = ` AND comments.user_id = '${userID}' `;
    } else {
        where_admin = ``;
    }

    const query_comment = ` DELETE 
                            FROM    comments
                            WHERE   comments.id = '${commentID}'
                                    ${where_admin}  `;
    console.log(query_comment);
    mysql.query(query_comment, function(err, result) {
        if (err) {
            return res.status(506).json(err.message);
        } else {
            res.status(201).json({ message: "Commentaire retiré !" });
        }
    });
}