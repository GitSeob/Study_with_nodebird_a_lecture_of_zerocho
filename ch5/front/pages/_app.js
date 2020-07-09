import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import withRedux from 'next-redux-wrapper'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers'
import { Provider } from 'react-redux'
// import { createSagaMiddleware } from 'redux-saga'
import rootSaga from '../sagas'
import createSagaMiddleware from '@redux-saga/core';

const NodeBird = ({ Component, store }) => {
    return(
        <Provider store={store}>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js" />
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
        </Provider>
    )
}

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
}

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware]
    const enhancer = process.env.NODE_ENV === 'production' 
        ? compose(applyMiddleware(...middlewares), )
        : compose(
            applyMiddleware(...middlewares),
            typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !=='undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__(): (f)=>f,
    )
    const store = createStore(reducer, initialState, enhancer)
    sagaMiddleware.run(rootSaga)
    return store
}

export default withRedux(configureStore)(NodeBird)