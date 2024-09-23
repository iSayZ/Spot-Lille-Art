const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import account-related actions
const { banAccountById, deleteAccount } = require("../../../controllers/accountActions");

// Route to ban an Account depend on id_member
router.put("/ban/:id", banAccountById);

// Route to delete an Account
router.delete("/delete/:id", deleteAccount)

/* ************************************************************************* */

module.exports = router;
