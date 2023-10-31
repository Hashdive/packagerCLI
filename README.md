# Packager CLI

## Overview

The Packager CLI is a simple command-line utility that allows you to create packages, add files to packages, remove files from packages, and apply packages to target folders. It's a convenient tool for managing sets of files that need to be bundled together for various purposes.

It adds new packages to the included /packages folder. You can then add or remove files to those packages (which are simply subfolders of /packages). Finally, 'apply' the files in the package to a target destination folder.

## Features

- **Create Packages:** Create a new package with a specified name.

- **Add Files:** Add a file to an existing package.

- **Remove Files:** Remove a file from an existing package.

- **Apply Packages:** Apply the contents of a package to a target folder.

## Installation

1. Clone this repository to your local machine.

2. `cd packagerCLI`

3. Run `npm install` to install the required dependencies.

## Usage

### Create a Package

To create a new package, run the following command:

```shell
node script.js create --name [PACKAGE_NAME]
```

This will create a new package with the specified name.

### Add a File to a Package

To add a file to an existing package, run the following command:

```shell
node script.js add --package [PACKAGE_NAME] --file [FILE_PATH]
```

This will add the specified file to the package.

### Remove a File from a Package

To remove a file from an existing package, run the following command:

```shell
node script.js remove --package [PACKAGE_NAME] --file [FILE_NAME]
```

This will remove the specified file from the package.

### Apply a Package to a Target Folder

To apply the contents of a package to a target folder, run the following command:

```shell
node script.js apply --package [PACKAGE_NAME] --target [TARGET_FOLDER]
```

This will copy all the files from the package to the target folder.

## Contributing

Feel free to contribute to this project by creating issues or submitting pull requests.
