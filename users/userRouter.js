const express = require('express')
const Users = require('./userDb')
const Posts = require('../posts/postDb')

const router = express.Router();

router.get('/', (req, res) => {
    
    Users.get()
        .then(users => {
            res.status(200).send(users)
        })
        .catch(err => {
            res.status(500).json( { error: "The user information could not be retrieved." })
        })
});

router.get('/:id', validateUserId, (req, res) => {
    
    res.status(200).json(req.user)
    
});

router.get('/:id/posts', validateUserId, (req, res) => {

    Users.getUserPosts(req.params.id)
        .then(post => {
            if(!post.id) {
                res.status(200).json({ message: "User Doesn't Have any Post :( "})
            } else {
            res.status(200).send(post)
            }
        })
        .catch(err => {
            res.status(500).json( { error: "The post information could not be retrieved." })
        })

});

router.post('/', validateUser, (req, res) => {
    const newUser = req.body

    Users.insert(newUser)
        .then(user => {
            res.status(200).send(user)
        })
        .catch(err => {
            res.status(500).json( { error: "The user information could not be added." })
        })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const newPost = req.body
    const userId = req.params.id
    newPost.user_id = userId

    Posts.insert(newPost)
        .then(post => {
            res.status(200).send(post)
        })
        .catch(err => {
            res.status(500).json( { error: "The post information could not be added." })
        })

});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    const userId = req.params.id
    const userChange = req.body

    Users.update(userId, userChange)
        .then(count => {
            res.status(201).json({ message: "User updated Successfully"})
        })
        .catch(err => {
            res.status(500).json( { error: "The user information could not be updated." })
        })
});

router.delete('/:id', validateUserId, (req, res) => {

    Users.remove(req.params.id)
        .then(num => {
            res.status(204).end()
        })
        .catch(err => {
            res.status(500).json( { error: "The user information could not be deleted." })
        })
});


//MiddleWare
function validateUserId(req, res, next) {
    const userId = req.params.id
    
    
    Users.getById(userId)
        .then(user => {
            // console.log(user)
            if(!user) {
                res.status(404).json({ message: "invalid user id" }) 
            } else {
                req.user = user
                next()
                // res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({error: "The user information could not be retrieved."})
        })
};

function validateUser(req, res, next) {
    console.log(req.body)
    const user = req.body

    if(!user.name) {
        res.status(400).json({ message: "missing user data" }) 
    } else if(!user.name.trim()) {
        res.status(400).json({ message: "missing required name field" })         
    } else {
        next()
    }

};

function validatePost(req, res, next) {
    const post = req.body
    
    if(!post.text) {
        res.status(400).json({ message: "missing post data" }) 
    } else if(!post.text.trim()) {
        res.status(400).json({ message: "missing required text field" })         
    } else {
        next()
    }

};


module.exports = router;
