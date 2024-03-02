const Listing = require("../models/listing");
const { listingSchema } = require("../schema");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

module.exports.edit = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Requested listing does not exist");
    return res.redirect("/listings");
  }
  res.render("./listings/edit.ejs", { listing });
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Requested listing does not exist");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
};

module.exports.create = async (req, res) => {
  let result = listingSchema.validate(req.body.listing);
  console.log(result);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New listing created");
  res.redirect("/listings");
};

module.exports.update = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "listing updated");
  res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "listing Deleted");
  res.redirect("/listings");
};
