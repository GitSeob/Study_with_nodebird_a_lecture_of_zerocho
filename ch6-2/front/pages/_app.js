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

const NodeBird = ({ Component, store, pageProps }) => {
    return(
        <Provider store={store}>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js" />
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <AppLayout>
                <Component {...pageProps}/>
            </AppLayout>
        </Provider>
    )
}

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired
}

NodeBird.getInitialProps = async (context) => { // app.js의 context는 next에 내려줌
    console.log(context)
    const { ctx, Component } = context
    let pageProps = {}
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
}
// hashtag.js 에서 initialProps를 사용하기 위해 _app.js에 위의 코드를 추가해주어야 한다.

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