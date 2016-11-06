#!/bin/bash

# Check if there are uncommited changes. Exit with an error if there are.
if [[ `git diff-index HEAD` != "" ]];
then echo "ERROR! You have uncommited changes..." && exit 1;
else echo "Deploy in progress...";
fi

# lint the code
npm run lint

# run the tests
npm test

# Build JS into dist/app.js
npm run dist

# Copy other files into dist/
cp -r css index.html favicon.ico dist

# git add new dist/ assets
git add .

# Commit dist/ changes
git commit -m "Deploy to gh-pages..."

# Push commited changes to master
git push upstream master

# Push dist folder to gh-pages branch
git subtree push --prefix dist upstream gh-pages
