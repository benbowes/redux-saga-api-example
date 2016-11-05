import 'babel-polyfill'; // required by redux-saga for generator func's
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import Search from './Search';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

// Temporary way to set initialState... might check out react-router-redux
const routeSearchStr = decodeURIComponent(
  browserHistory.getCurrentLocation().pathname.split('/search')[1].replace(/\//g, '')
);

const store = configureStore(routeSearchStr);

const Root = ({children}) => (<div>{children}</div>);
Root.propTypes = { children: PropTypes.element.isRequired };

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
        <IndexRedirect to="search" />
        <Route path="search" component={Search} />
        <Route path="search/:searchString" component={Search} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
