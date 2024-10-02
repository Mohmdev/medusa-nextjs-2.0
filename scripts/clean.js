const fs = require('fs');
const path = require('path');

const animateDots = (message, interval = 500) => {
  let count = 0;
  const animation = setInterval(() => {
    process.stdout.write(`\r${message}${'.'.repeat(count % 4)}`);
    count++;
  }, interval);
  return animation;
};

const deleteFolderRecursive = (folderPath, folderName) => {
  if (fs.existsSync(folderPath)) {
    const animation = animateDots(`Removing "${folderName}"`);
    
    // Delete files and folders recursively
    const deleteFilesAndFolders = (currentPath) => {
      fs.readdirSync(currentPath).forEach((file) => {
        const filePath = path.join(currentPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
          deleteFilesAndFolders(filePath);
        } else {
          fs.unlinkSync(filePath); // Delete file
        }
      });
      fs.rmdirSync(currentPath); // Remove empty folder
    };

    deleteFilesAndFolders(folderPath);
    
    clearInterval(animation);
    console.log(`\rDirectory "${folderName}" was removed successfully.`);
  } else {
    console.log(`Directory "${folderName}" does not exist. Skipping...`);
  }
};

const deleteFile = (filePath, fileName) => {
  if (fs.existsSync(filePath)) {
    const animation = animateDots(`Removing "${fileName}"`);
    fs.unlinkSync(filePath);
    clearInterval(animation);
    console.log(`\r"${fileName}" was removed successfully.`);
  } else {
    console.log(`"${fileName}" does not exist. Skipping...`);
  }
};

// Define the root directory
const rootDir = path.resolve(__dirname, '..');

// Welcome message
console.log('Preparing workspace to update dependencies...');

// Remove node_modules directory
deleteFolderRecursive(path.join(rootDir, 'node_modules'), 'node_modules');

// Remove .next directory
deleteFolderRecursive(path.join(rootDir, '.next'), '.next');

// Remove package-lock.json file
deleteFile(path.join(rootDir, 'package-lock.json'), 'package-lock.json');

// Final result message
console.log('Workspace is ready for fresh packages.');
