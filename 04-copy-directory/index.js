const fs = require('fs/promises');
const path = require('path');

const updateDestinationDir = async (destinationDir) => {
  try {
    // Instead of looping through files just delete the directory and recreate it again
    await fs.rm(destinationDir, { force: true, recursive: true });
    await fs.mkdir(destinationDir, { recursive: true });
  } catch (err) {
    console.log(err);
  }
};

const copyDirectory = async (sourceDir, destinationDir) => {
  try {
    await updateDestinationDir(destinationDir);

    const sourceFiles = await fs.readdir(sourceDir, {
      withFileTypes: true,
    });

    sourceFiles.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(sourceDir, file.name);
        fs.copyFile(filePath, path.join(destinationDir, file.name));
      } else {
        // copy recursively
        const nestedDir = file;
        copyDirectory(
          path.join(nestedDir.path, nestedDir.name),
          path.join(destinationDir, nestedDir.name),
        );
      }
    });
  } catch (err) {
    console.error(err.message);
  }
};

const sourceDir = path.join(__dirname, 'files');
const destinationDir = path.join(__dirname, 'files-copy');
copyDirectory(sourceDir, destinationDir);

module.exports = { copyDirectory };
