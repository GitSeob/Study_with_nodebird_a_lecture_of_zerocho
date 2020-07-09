import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga' // 서버사이드 렌더링을 위한 사가 설정 - 
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from '@redux-saga/core';
import reducer from '../reducers'
import axios from 'axios'

import AppLayout from '../components/AppLayout'
import { Provider } from 'react-redux'
import rootSaga from '../sagas'

import { LOAD_USER_REQUEST } from '../reducers/user';

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
    const { ctx, Component } = context
    let pageProps = {}
    const state = ctx.store.getState()
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '' // cookie
    if(ctx.isServer && cookie ) { // 클라이언트일 경우에는 브라우저가 있으므로 서버사이드 랜더링일 경우에만 아래 수행
        axios.defaults.headers.Cookie = cookie // 프론트 서버에서 백 서버로 보낼때 쿠키를 동봉해준다는 설정 
    }
    if(!state.user.me){
        ctx.store.dispatch({
            type: LOAD_USER_REQUEST
        })
    }// AppLayout SSR

    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps } 
}

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware, (store) => (next) => ( action ) =>{
        console.log(action)
        next(action)
    }] // dispatch 로깅하는 커스텀 미들웨어
    const enhancer = process.env.NODE_ENV === 'production' 
        ? compose(applyMiddleware(...middlewares), )
        : compose(
            applyMiddleware(...middlewares),
            typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !=='undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__(): (f)=>f,
    )
    const store = createStore(reducer, initialState, enhancer)
    store.sagaTask = sagaMiddleware.run(rootSaga) // withReduxSaga 를 위함
    return store
}

export default withRedux(configureStore)(withReduxSaga(NodeBird))