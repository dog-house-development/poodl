# Poodl

[![Build Status](https://travis-ci.org/dog-house-development/poodl.svg?branch=dev)](https://travis-ci.org/dog-house-development/poodl)
[![Coverage Status](https://coveralls.io/repos/github/dog-house-development/poodl/badge.svg?branch=dev&service=github)](https://coveralls.io/github/dog-house-development/poodl?branch=dev&service=github)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/63b5098b43bc458ea3e5ef8de9f5bc8b)](https://www.codacy.com/app/DogHouseDevelopment/poodl?utm_source=github.com&utm_medium=referral&utm_content=dog-house-development/poodl&utm_campaign=Badge_Grade)
[![Github Version](https://img.shields.io/github/release/dog-house-development/poodl.svg?style=flat)](https://github.com/dog-house-development/poodl/releases)
[![Uptime Robot 30 Days](https://img.shields.io/uptimerobot/ratio/m781947640-2764269a69a56d48f8edc5db.svg?style=flat)](https://poodl.herokuapp.com/)
[![Uptime Robot Status](https://img.shields.io/uptimerobot/status/m781947640-2764269a69a56d48f8edc5db.svg?style=flat)](https://poodl.herokuapp.com/)

_Welcome to Poodl!_ Find our application at [https://poodl.herokuapp.com/](https://poodl.herokuapp.com/ 'poodl'). Please read [our wiki](https://github.com/dog-house-development/poodl/wiki 'poodl wiki') to learn more.

## Sites

**Development:** [poodl-dev.herokuapp.com](http://poodl-dev.herokuapp.com/)

**Production:** [poodl.herokuapp.com](http://poodl-dev.herokuapp.com/)

## Setup for Development

_Before starting development, familiarize yourself with
the merge strategy in the wiki_

### Ensure that you have yarn, npm, and node installed

If you are not sure if you do, type `yarn -v`, `node -v`,
and `npm -v`, and it will either say `command not found`
or tell you a version number.

If any of the above are not installed, using homebrew,
type `brew install yarn`

Installing yarn will also install node and npm

or, if yarn is installed without node or npm,
`brew install node`. npm comes with node

We are on `yarn 1.13`, `npm 6`, and `node 8-11`

Make sure you have the correct yarn installed.
If none of the commands are working, like `yarn -v`,
then uninstall that yarn and get the correct one

### Clone the repository onto your computer

Clone the repository

```bash
git clone git@github.com:dog-house-development/poodl.git
```

Change directory to poodl

```bash
cd poodl
```

### Install dependencies

To install all dependencies, run:

```bash
yarn install-all
```

Install nodemon globally

```bash
yarn global add nodemon
```

### Add config/secrets.js
We keep our database key secret, ask doghousedevelop@gmail.com to join our slack to have access to our keys. 
Make sure you only use our dev database.

```js
// config/secrets.js
module.exports = {
    mongoURI: '<mongo database secret key>'
};
```
You can also start a local mongo database and use that key instead. See [installing mongodb](https://docs.mongodb.com/manual/installation/).

### Start development server

To start the development server, run:

```bash
yarn start:dev
```

Instead of adding a secrets.js file you can export the mongo uri as an environment variable:

```bash
export MONGO_URI=<mongodb uri> yarn start:dev
```

### Publish your changes

To merge your changes into production, follow the
merge strategy
[here.](https://github.com/dog-house-development/poodl/wiki/Git-Merging-Strategy)
