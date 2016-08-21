import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from 'sagas/index';
import { initialState } from 'store/initialState';

/*
 * @returns {Object} redux store
 * @description `rootSaga*` will is called after middleware is applied.
 * `Redux devToolsExtension` Chrome extension will be available if yer `Chrome` has it.
 */
export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware( sagaMiddleware ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  sagaMiddleware.run(rootSaga);

  if (!window.devToolsExtension) {
    console.warn(`Download Redux DevTools for a better dev experience\n
      https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
    `);
  }

  return store;
}
