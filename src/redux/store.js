import { createStore, compose, applyMiddleware } from 'redux';
import RootReducer from './reducers/RootReducer';
import thunk from 'redux-thunk'; 

const middlewares = [thunk];

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    RootReducer,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
)

export {store};