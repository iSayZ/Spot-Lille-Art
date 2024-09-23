const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  browseMemberArtwork,
  updateArtwork,
  browseArtworksNotValidate,
  readArtworksNotValidate,
  read,
  add,
  validateNewArtwork,
  denyNewArtwork,
  browseArtworksReported,
  readArtworksReported,
  keepArtworkReported,
  deleteArtworkReported,
} = require("../../../controllers/artworkActions");

const { verifyToken } = require("../../../services/auth");

// Route to get a list of artworks validates
router.get("/", browse);

// Route to get one specific artwork with user info
router.get("/:id", read);

// Route to get a list of artwork of the profile
router.get("/profile/:id", verifyToken, browseMemberArtwork);

// Route to add a new artwork
router.post("/", add);

// Route to report a new artwork
router.post("/:id/report", updateArtwork);

// ARTWORKS NOT VALIDATED
// Route to get all artworks not validate
router.get("/admin/not-validate", browseArtworksNotValidate);

// Route to get artwork by id not validate
router.get("/admin/not-validate/:id", readArtworksNotValidate);

// Route to validate a new artwork
router.post("/admin/not-validate/:id/validate", validateNewArtwork);

// Route to deny a new artwork
router.delete("/admin/not-validate/:id/deny", denyNewArtwork);

// ARTWORKS REPORTED
// Route to get a list of artwork reported
router.get("/admin/reported", browseArtworksReported);

// Route to get artwork by id reported
router.get("/admin/reported/:id", readArtworksReported);

// Route to validate a new artwork
router.post("/admin/reported/:id/validate", keepArtworkReported);

// Route to deny a new artwork
router.delete("/admin/reported/:id/deny", deleteArtworkReported);

/* ************************************************************************* */

module.exports = router;
