
## A Giphy client that utilises React, Redux, Redux Saga and CSS Modules

![Build status](https://api.travis-ci.org/benbowes/redux-saga-api-example.svg)

<img src="https://media.giphy.com/media/3xz2BDFvxop2BfAQoM/giphy.gif" width="20%" />

## Demo link
 [https://benbowes.github.io/redux-saga-api-example/](https://benbowes.github.io/redux-saga-api-example/)

#### Overview

Provides an easy way to copy/paste Github GIF embed code to use in pull requests.

Search your favourite term, then click on a thumb to see a high res version. Initially a low res Gif gets stretched out to full-size whilst a background task preloads a high-res version of the Gif.

Clicking on the embed code will auto-select the whole string for easy copy/pasting.

#### 1) Getting started.

1. `npm install`
2. `npm start`
3. Then open [http://localhost:3005/webpack-dev-server/](http://localhost:3005/webpack-dev-server/)

#### Lint the code (with eslint)
```
npm run lint
```

#### Run the unit tests
```
npm test
```
or with [watch](https://mochajs.org/#usage) flag.
```
npm test -- -w
```

#### Distribute the code
```
npm run dist
```

#### Deploy the code
```
npm run deploy
```

#### Node and NPM versions
This app was built with these versions of node and npm
- Node: v4.3.0
- npm: 2.14.12

### See all the available commands with:

```
npm run
```

### Todo
- --Copy/paste embed code--
- Add React Router
- Add Infinite scroll
