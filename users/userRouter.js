const express = require('express')
const Users = require('./userDb')

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
    
    // console.log(req.test)
    res.status(200).json(req.user)

    // req.user.id = req.params.id
    // const user = req.user

    // console.log(user)
    // res.status(200).json(req.user)



    // Users.getById(userId)
    //     .then(user => {
    //         // console.log("FindbyId:", user)
    //         if(!user) {
    //             res.status(404).json({ message: "The user with the specified ID does not exist." }) 
    //         } else {
    //             res.status(200).json(user)
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).json({error: "The user information could not be retrieved."})
    //     })
});

router.get('/:id/posts', (req, res) => {

    Users.getUserPosts(req.params.id)
        .then(post => {
            res.status(200).send(post)
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

router.post('/:id/posts', (req, res) => {

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

    next()
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

    
};


module.exports = router;
