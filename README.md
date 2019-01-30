# Poodl
Welcome to Poodl!

_Attention! This is in no way our final getting setup guide, just some things I remember having to do to get myself set up_

To get your development environment setup, follow the instructions below.

_Before starting development, familiarize yourself with the merge strategy in the wiki_

### Ensure that you have yarn, npm, and node installed
If you are not sure if you do, type `yarn -v`, `npm -v`, and `node -v` and it will either say `command not found` or tell you a version number.

If any of the above are not installed, using homebrew, type `brew install yarn` or `brew install node`. npm comes with node

We are on `yarn 1`, `npm 6`, and `node 8`

Make sure you have the correct yarn installed

### Clone the repository onto your computer

`git clone <remote>`

### Install dependencies

`npm i`

`npm i concurrently react-scripts nodemon mongoose express moment`

### Start development server

`yarn start:dev`
