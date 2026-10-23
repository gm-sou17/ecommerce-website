
const express = require("express");
const ImageKit = require("@imagekit/nodejs");

const router = express.Router();

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

router.get("/auth", (req, res) => {
  try {
    const { token, expire, signature } =
      imageKit.helper.getAuthenticationParameters();

    res.json({
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("ImageKit authentication error:", error);
    res.status(500).json({
      message: "ImageKit authentication failed",
    });
  }
});

module.exports = router;
