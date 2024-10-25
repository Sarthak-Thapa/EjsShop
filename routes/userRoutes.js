//Importing
const express = require('express');
const {
    signUp,
    loginPage,
    getUsers,
    getUser,
    createUser,
    login,
    logout,
    deleteUser,
    updateUser,
    profile

}=require('../controllers/userController')
const islogged = require('../middleware/loggedIn')

const router = express.Router();


// router.get('/signup', signUp)


//get login page
router.get('/login', loginPage)

//get logout route
router.get('/logout', logout)

//get Profile page

router.get('/profile', islogged, profile);

//Get all users
router.get('/', getUsers)

// GET a single user
router.get('/:id', getUser)

// POST a new user
router.post('/', createUser)

// POST a new user
router.post('/login', login)

// DELETE a user
router.delete('/:id', deleteUser)

// UPDATE a user
router.patch('/:id', updateUser)




module.exports = router