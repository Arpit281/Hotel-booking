const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../util/asyncWrap");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn } = require("../middleware.js");
const reviewController = require("../controller/reviews");
const review = require("../models/review.js");

//reviews route
router.post("/", isLoggedIn, wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
