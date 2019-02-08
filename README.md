# Poodl

[![Build Status](https://travis-ci.org/dog-house-development/poodl.svg?branch=dev)](https://travis-ci.org/dog-house-development/poodl)

_Welcome to Poodl!_ Find our application at [https://poodl.herokuapp.com/](https://poodl.herokuapp.com/ 'poodl'). Please read [our wiki](https://github.com/dog-house-development/poodl/wiki 'poodl wiki') to learn more.

### Sites

**dev:** [poodl-dev.herokuapp.com](http://poodl-dev.herokuapp.com/)

**prod:** [poodl.herokuapp.com](http://poodl-dev.herokuapp.com/)

## Setup for Development

_Before starting development, familiarize yourself with the merge strategy in the wiki_

### Ensure that you have yarn, npm, and node installed

If you are not sure if you do, type `yarn -v`, `npm -v`, and `node -v` and it will either say `command not found` or tell you a version number.

If any of the above are not installed, using homebrew, type `brew install yarn`

Installing yarn will also install node and npm

or, if yarn is installed without node or npm, `brew install node`. npm comes with node

We are on `yarn 1.13`, `npm 6`, and `node 8-11`

Make sure you have the correct yarn installed. If none of the commands are working, like `yarn -v`, then uninstall that yarn and get the correct one

### Clone the repository onto your computer

-   Clone: `git clone <remote>`
-   Change directory: `cd poodl`

### Install dependencies

To install all dependencies, run:

`yarn all-install`

### Start development server

To start the development server, run:

`yarn start:dev`

### Publish your changes

To merge your changes into production, follow the merge strategy [here.](https://github.com/dog-house-development/poodl/wiki/Git-Merging-Strategy)
