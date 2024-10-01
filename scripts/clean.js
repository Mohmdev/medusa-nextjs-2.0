const fs = require('fs')
const path = require('path')

const animateDots = (message, interval = 500) => {
  let count = 0
  const animation = setInterval(() => {
    process.stdout.write(`\r${message}${'.'.repeat(count % 4)}`)
    count++
  }, interval)
  return animation
}

const deleteFolderRecursive = (folderPath, folderName) => {
  if (fs.existsSync(folderPath)) {
    const animation = animateDots(`Deleting directory "${folderName}"`)
    fs.readdirSync(folderPath).forEach((file) => {
      const currentPath = path.join(folderPath, file)
      if (fs.lstatSync(currentPath).isDirectory()) {
        // Recurse
        deleteFolderRecursive(currentPath, folderName)
      } else {
        // Delete file
        fs.unlinkSync(currentPath)
      }
    })
    fs.rmdirSync(folderPath)
    clearInterval(animation)
    console.log(`\rDeleted directory "${folderName}".`)
  } else {
    console.log(`Directory "${folderName}" does not exist. Skipping...`)
  }
}

const deleteFile = (filePath, fileName) => {
  if (fs.existsSync(filePath)) {
    const animation = animateDots(`Deleting lockfile "${fileName}"`)
    fs.unlinkSync(filePath)
    clearInterval(animation)
    console.log(`\rDeleted lockfile "${fileName}".`)
  } else {
    console.log(`Lockfile "${fileName}" does not exist. Skipping...`)
  }
}

// Define the root directory
const rootDir = path.resolve(__dirname, '..')

// Welcome message
console.log('Preparing workspace to update dependencies...')

// Remove node_modules directory
deleteFolderRecursive(path.join(rootDir, 'node_modules'), 'node_modules')

// Remove .next directory
deleteFolderRecursive(path.join(rootDir, '.next'), '.next')

// Remove package-lock.json file
deleteFile(path.join(rootDir, 'package-lock.json'), 'package-lock.json')

// Final result message
console.log('Workspace is ready for fresh packages.')
