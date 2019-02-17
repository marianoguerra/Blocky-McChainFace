import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
// import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'

import createRootReducer from './reducers'
// import sagas from './sagas'

export const history = createHistory({
    basename: '/'
});

// const persistedState = localStorage.getItem('persistedState') ? JSON.parse(localStorage.getItem('persistedState')) : {};
const persistedState = {};
const enhancers = []

// Create the saga middleware.
// const sagaMiddleware = createSagaMiddleware()

// Scroll to top on each view change
history.listen(loc => { // eslint-disable-line
    setTimeout(() => {
        window.scrollTo(0, 0);
    });
});

const middleware = [
    // sagaMiddleware,
    routerMiddleware(history)
]

// eslint-disable-next-line
if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

const store = createStore(
    createRootReducer(history),
    persistedState,
    composedEnhancers
);

store.subscribe(()=>{
    localStorage.setItem('persistedState', JSON.stringify(store.getState()))
})


// Finally run the saga.
// sagaMiddleware.run(sagas);

export default store;
