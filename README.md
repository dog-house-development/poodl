# Poodl

Welcome to Poodl!

**To get your development environment setup, follow the instructions below.**

_Before starting development, familiarize yourself with the merge strategy in the wiki_

### Ensure that you have yarn, npm, and node installed

If you are not sure if you do, type `yarn -v`, `npm -v`, and `node -v` and it will either say `command not found` or tell you a version number.

If any of the above are not installed, using homebrew, type `brew install yarn`

Installing yarn will also install node and npm

or, if yarn is installed without node or npm, `brew install node`. npm comes with node

We are on `yarn 1.13`, `npm 6`, and `node 8-11`

Make sure you have the correct yarn installed. If none of the commands are working, like `yarn -v`, then uninstall that yarn and get the correct one

### Clone the repository onto your computer

- Clone: `git clone <remote>`
- Change directory: `cd poodl`

### Install dependencies

To install dependencies, run:

`yarn && yarn client-install`

### Start development server

To start the development server, run:

`yarn start:dev`

### Publish your changes

To merge your changes into production, follow the merge strategy [here.](https://github.com/dog-house-development/poodl/wiki/Git-Merging-Strategy)
