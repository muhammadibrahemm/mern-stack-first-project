const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller")
const validate = require("../middlewares/validate-middleware");
const schemaValidators = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/auth-middleware")

router.route("/register").post(validate(schemaValidators.signupSchema),authControllers.register);

router.route("/login").post(validate(schemaValidators.loginSchema),authControllers.loggedIn);

router.route("/user").get(authMiddleware,authControllers.user);


module.exports = router;