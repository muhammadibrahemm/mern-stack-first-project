const express = require('express');
const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');
const router = express.Router();


// route for getting all the registered users
router.route('/users').get(authMiddleware, adminMiddleware, adminController.getAllUsers);

// route for getting a single user by id that will come from the edit user
router.route('/users/:id').get(authMiddleware, adminMiddleware, adminController.getUserById)

// route for updating user id
router.route('/users/update/:id').patch(authMiddleware, adminMiddleware, adminController.updateUserById);

// route for getting all contacts
router.route('/contacts').get(authMiddleware, adminMiddleware, adminController.getAllContacts);

// route for deleting the specific contact based on id
router.route('/contacts/delete/:id').delete(authMiddleware, adminMiddleware, adminController.deleteContact)

// route for deleting a single user
router.route('/users/delete/:id').delete(authMiddleware, adminMiddleware, adminController.deleteUser);

module.exports = router;