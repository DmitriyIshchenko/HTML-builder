const fs = require("node:fs/promises");
const path = require("path");

const updateDestinationDir = async (destinationDir) => {
  try {
    await fs.mkdir(destinationDir, { recursive: true });

    // remove old files
    const files = await fs.readdir(destinationDir);
    files.forEach((file) => fs.unlink(path.join(destinationDir, file)));
  } catch (err) {
    console.error(err.message);
  }
};

const copyDirectory = async (sourceDir, destinationDir) => {
  try {
    await updateDestinationDir(destinationDir);

    const sourceFiles = await fs.readdir(sourceDir);

    sourceFiles.forEach((fileName) => {
      const filePath = path.join(sourceDir, fileName);
      fs.copyFile(filePath, path.join(destinationDir, fileName));
    });
  } catch (err) {
    console.error(err.message);
  }
};

const sourceDir = path.join(__dirname, "files");
const destinationDir = path.join(__dirname, "files-copy");
copyDirectory(sourceDir, destinationDir);

module.exports = { copyDirectory };