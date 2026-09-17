const fs = require("fs");
const path = require("path");

const CAROUSEL_DIR = path.join(
  __dirname,
  "../../../frontend/public/carousal"
);
const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"];

const getCarouselImages = (req, res) => {
  try {
    const files = fs.existsSync(CAROUSEL_DIR)
      ? fs.readdirSync(CAROUSEL_DIR)
      : [];

    const images = files
      .filter((file) =>
        ALLOWED_EXTENSIONS.includes(path.extname(file).toLowerCase())
      )
      .sort()
      .map((file) => `/carousal/${encodeURIComponent(file)}`);

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { getCarouselImages };
