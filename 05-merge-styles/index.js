const path = require("path");
const { readdir, writeFile, readFile } = require("node:fs/promises");

const sourceDir = path.join(__dirname, "styles");
const outputPath = path.join(__dirname, "project-dist", "bundle.css");

const mergeStyles = async (sourceDir, outputFile) => {
  try {
    // read only css files
    let files = await readdir(sourceDir);
    files = files.filter((fileName) => {
      const filePath = path.join(sourceDir, fileName);
      return path.extname(filePath) === ".css";
    });

    // save data
    let styles = "";
    for (let file of files) {
      const data = await readFile(path.join(sourceDir, file), "utf-8");
      styles += data;
    }

    // create bundle
    writeFile(outputFile, styles);
  } catch (err) {
    console.error(err.message);
  }
};

mergeStyles(sourceDir, outputPath);

module.exports = { mergeStyles };