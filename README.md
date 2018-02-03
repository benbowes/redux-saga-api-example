
## A Giphy client that utilises React, Redux, Redux Saga and CSS Modules

![Build status](https://api.travis-ci.org/benbowes/redux-saga-api-example.svg)

<img src="https://media.giphy.com/media/3xz2BDFvxop2BfAQoM/giphy.gif" width="20%" />

## Demo link
 [https://benbowes.github.io/redux-saga-api-example/](https://benbowes.github.io/redux-saga-api-example/)

#### Overview

This Giphy client provides an easy way to copy/paste Github GIF embed code for use in pull requests. Aiding in easy GDD (Gif Driven Development). It's an excellent way to share the love umoungst your friendly crew.

Search your favourite term, then click on your favoured Gif's input text box to select your Github image embed code. You can copy/paste this into your pull request.

Clicking on a thumb will reveal a Gif viewer modal. Initially a low-res Gif gets loaded into the modal but has the full-size Gif's final dimensions. In the background, the modal preloads a high-res version of the Gif which will replace the low-res Gif.

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
