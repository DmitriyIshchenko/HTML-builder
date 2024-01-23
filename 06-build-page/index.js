const { readdir, readFile, mkdir, writeFile } = require('node:fs/promises');
const path = require('path');
const { mergeStyles } = require('../05-merge-styles');
const { copyDirectory } = require('../04-copy-directory');

const getComponentsObj = async () => {
  try {
    const components = {};
    const componentsDir = path.join(__dirname, 'components');

    const files = await readdir(componentsDir);
    for (let file of files) {
      const [fileName] = file.match(/^\w+/); // drop extension
      components[fileName] = await readFile(
        path.join(componentsDir, file),
        'utf-8',
      );
    }
    return components;
  } catch (err) {
    console.error(err.message);
  }
};

const mergeHTML = async () => {
  try {
    const componentsObj = await getComponentsObj();

    // read template
    const template = await readFile(
      path.join(__dirname, 'template.html'),
      'utf-8',
    );

    // replace placeholders with components
    let newTemplate = template;
    Object.keys(componentsObj).forEach((component) => {
      newTemplate = newTemplate.replaceAll(
        `{{${component}}}`,
        componentsObj[component],
      );
    });

    // write to file
    await writeFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      newTemplate,
    );
  } catch (err) {
    console.error(err.message);
  }
};

const bundle = async () => {
  try {
    const distPath = path.join(__dirname, 'project-dist');
    await mkdir(distPath, { recursive: true });

    mergeHTML();
    mergeStyles(
      path.join(__dirname, 'styles'),
      path.join(distPath, 'style.css'),
    );
    // assets
    copyDirectory(
      path.join(__dirname, 'assets'),
      path.join(distPath, 'assets'),
    );
  } catch (err) {
    console.error(err.message);
  }
};

bundle();
