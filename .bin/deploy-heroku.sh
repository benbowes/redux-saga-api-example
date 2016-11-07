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

# Deploy to https://gif-driven-development.herokuapp.com/
git push heroku master
