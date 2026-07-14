// Генерирует favicon PNG всех размеров из public/favicon.svg через sharp
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = path.join(__dirname, "../public/favicon.svg");
const OUT = path.join(__dirname, "../public");

const sizes = [
  { name: "favicon-32.png",        size: 32  },
  { name: "apple-touch-icon.png",  size: 180 },
  { name: "icon-192.png",          size: 192 },
  { name: "icon-512.png",          size: 512 },
];

(async () => {
  const svg = fs.readFileSync(SRC);
  for (const { name, size } of sizes) {
    await sharp(svg)
      .resize(size, size)
      .png()
      .toFile(path.join(OUT, name));
    console.log(`✓ ${name} (${size}×${size})`);
  }
  console.log("done");
})();
