const { readdir } = require('node:fs/promises');
const path = require('path');
const fs = require('fs');

const getFilesData = async () => {
  try {
    const files = await readdir(path.join(__dirname, 'secret-folder'), {
      withFileTypes: true,
    });

    files
      .filter((file) => file.isFile())
      .map((file) => {
        const filePath = path.join(__dirname, 'secret-folder', file.name);
        const { name, ext } = path.parse(filePath);

        fs.stat(filePath, (err, stats) => {
          console.log([name, ext.slice(1), stats.size + 'b'].join(' - '));
        });
      });
  } catch (err) {
    console.error(err.message);
  }
};

getFilesData();
