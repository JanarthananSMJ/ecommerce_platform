const express = require("express");

const {
  getCarouselImages,
} = require("../../controllers/common/carousel-controller");

const router = express.Router();

router.get("/get", getCarouselImages);

module.exports = router;
