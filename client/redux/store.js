import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers/root';

// Export this so we can access it from elsewhere
export const history = createHistory();

/* Combines middleware all into one */
const middleware = applyMiddleware(promise(), thunk, routerMiddleware(history));

/* Create the store using our reducers, initialState, and middleware */
const store = createStore(reducers, composeWithDevTools(middleware));

export default store;
