const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import member-related actions
const {
  browseMembersInAdmin,
  browseRanking,
  browseMemberById,
  createMember,
  editMemberById,
} = require("../../../controllers/memberActions");

const {
  hashPassword,
  verifyToken,
  verifyProfileAccess,
} = require("../../../services/auth");

// Route to get a list of members order by creation date
router.get("/last-register", browseMembersInAdmin);

// Route to get a list of members ranked
router.get("/ranked", browseRanking);

// Route to get a member by ID
router.get("/:id", verifyToken, verifyProfileAccess, browseMemberById);

// Route to get a new member
router.post("/new-member", hashPassword, createMember);

// Route to put a member informations
router.put(
  "/edit-member/:id",
  verifyToken,
  verifyProfileAccess,
  hashPassword,
  editMemberById
);

/* ************************************************************************* */

module.exports = router;
