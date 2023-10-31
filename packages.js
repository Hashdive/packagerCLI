const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const argv = yargs(process.argv.slice(2))
  .command('create', 'Create a new package', {
    name: {
      description: 'Package name',
      alias: 'n',
      type: 'string',
    },
  })
  .command('add', 'Add a file to a package', {
    package: {
      description: 'Package name',
      alias: 'p',
      type: 'string',
    },
    file: {
      description: 'File path',
      alias: 'f',
      type: 'string',
    },
  })
  .command('remove', 'Remove a file from a package', {
    package: {
      description: 'Package name',
      alias: 'p',
      type: 'string',
    },
    file: {
      description: 'File name',
      alias: 'f',
      type: 'string',
    },
  })
  .command('apply', 'Apply a package to a target folder', {
    package: {
      description: 'Package name',
      alias: 'p',
      type: 'string',
    },
    target: {
      description: 'Target folder',
      alias: 't',
      type: 'string',
    },
  })
  .help()
  .alias('help', 'h')
  .argv;

const packageDir = './packages';

function createPackage(name) {
  const packagePath = path.join(packageDir, name);
  if (fs.existsSync(packagePath)) {
    console.log(`Package ${name} already exists.`);
  } else {
    if (!fs.existsSync(packageDir)) {
      fs.mkdirSync(packageDir);
    }
    fs.mkdirSync(packagePath);
    fs.writeFileSync(path.join(packagePath, 'metadata.json'), JSON.stringify({ files: [] }));
    console.log(`Created package: ${name}`);
  }
}


function addFileToPackage(packageName, filePath) {
  const packagePath = path.join(packageDir, packageName);
  const metadataPath = path.join(packagePath, 'metadata.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  const fileName = path.basename(filePath);
  if (!metadata.files.includes(fileName)) {
    fs.copyFileSync(filePath, path.join(packagePath, fileName));
    metadata.files.push(fileName);
    fs.writeFileSync(metadataPath, JSON.stringify(metadata));
    console.log(`Added file: ${fileName} to package: ${packageName}`);
  } else {
    console.log(`File: ${fileName} is already in package: ${packageName}`);
  }
}

function removeFileFromPackage(packageName, fileName) {
  const packagePath = path.join(packageDir, packageName);
  const metadataPath = path.join(packagePath, 'metadata.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  const index = metadata.files.indexOf(fileName);
  if (index > -1) {
    metadata.files.splice(index, 1);
    fs.unlinkSync(path.join(packagePath, fileName));
    fs.writeFileSync(metadataPath, JSON.stringify(metadata));
    console.log(`Removed file: ${fileName} from package: ${packageName}`);
  } else { 
    console.log(`File: ${fileName} is not in package: ${packageName}`);
  }
}

function applyPackage(packageName, targetFolder) {
  const packagePath = path.join(packageDir, packageName);
  const metadataPath = path.join(packagePath, 'metadata.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  metadata.files.forEach((file) => {
    fs.copyFileSync(path.join(packagePath, file), path.join(targetFolder, file));
    console.log(`Copied file: ${file} to target: ${targetFolder}`);
  });
}

if (argv._.includes('create')) {
  createPackage(argv.name);
} else if (argv._.includes('add')) {
  addFileToPackage(argv.package, argv.file);
} else if (argv._.includes('remove')) {
  removeFileFromPackage(argv.package, argv.file);
} else if (argv._.includes('apply')) {
  applyPackage(argv.package, argv.target);
}
