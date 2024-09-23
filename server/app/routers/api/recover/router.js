const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import mail-related actions
const { sendEmailRecoverPwd } = require("../../../controllers/mailActions")

// ROAD TO CREATE TOKEN FOR SEND BY MAIL RECOVER PASSWORD
const { generateResetPwdToken, changePwd } = require("../../../controllers/authActions");

router.post("/", generateResetPwdToken, sendEmailRecoverPwd);

const { verifyResetToken ,verifyTokenRecoverPwd, hashPassword } = require("../../../services/auth");

// ROAD TO VERIFY TOKEN AND REDIRECT TO INDEX IF THE TOKEN IS INVALID
router.get("/verify-reset-token/:token", verifyResetToken)

// ROAD TO VERIFY TOKEN AND CHANGE PASSWORD
router.post("/:token", verifyTokenRecoverPwd, hashPassword, changePwd);

/* ************************************************************************* */

module.exports = router;
