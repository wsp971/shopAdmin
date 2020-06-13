const fs = require('fs');
const path = require('path');

const fileMaps = (basePath, fileMap) => {
  if (!fs.existsSync(basePath)) {
    throw new Error(`${basePath} 路径不存在`);
  }

  const files = fs.readdirSync(basePath);

  files.forEach(file => {
    const filePath = `${basePath}${path.sep}${file}`;
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      arguments.callee.call(this, filePath, fileMap);
    } else {
      fileMap[eliminateSuffix(filePath)] = filePath;
    }
  });
};

function eliminateSuffix(path) {
  console.log(path);
  const index = path.lastIndexOf('.');
  return path.substr(0, index);
}

exports.fileMap = fileMaps;
