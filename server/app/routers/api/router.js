const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

// ROAD FOR ARTWORKS
const artworksRouter = require("./artworks/router");

router.use("/artworks", artworksRouter);

// ROAD FOR MEMBERS
const membersRouter = require("./members/router");

router.use("/members", membersRouter);

// ROAD FOR ACCOUNTS
const accountsRouter = require("./accounts/router");

router.use("/accounts", accountsRouter);

// ROAD TO UPLOAD
const uploadRouter = require("./upload/router");

router.use("/upload", uploadRouter);

// ROAD TO LOGIN
const authActions = require("../../controllers/authActions");

router.post("/login", authActions.login);

// ROAD TO VERIFY ADMIN ACCESS
const { verifyAdminAccess, verifyToken } = require("../../services/auth");

router.get("/admin/verify", verifyToken, verifyAdminAccess)

// ROAD TO RECOVER PASSWORD
const recoverRouter = require("./recover/router")

router.use("/recover", recoverRouter);

// ROAD TO SEND MAIL
const mailRouter = require("./mails/router")

router.use("/mails", mailRouter)

// ROAD TO STATISTICS
const statisticsActions = require("../../controllers/statisticActions")

router.use("/statistics", statisticsActions.browse)

/* ************************************************************************* */

module.exports = router;
