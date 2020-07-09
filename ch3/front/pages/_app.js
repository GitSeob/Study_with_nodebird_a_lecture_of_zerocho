import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import withRedux from 'next-redux-wrapper'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers'
import { Provider } from 'react-redux'

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
    Component: PropTypes.elementType,
    store: PropTypes.object,
}

// props에 store를 넣어줄 부분이 없기에 wrapper 사용
export default withRedux((initialState, options) => {
    // 여기에 store 커스터마이징
    const middlewares = []
    // redux는 단순히 action과 reducer에 따라 state를 바꿔주는 것이다.
    // 그 외의 기능을 이용하고 싶다면 middleware를 사용해야한다.
    const enhancer = compose(
        applyMiddleware(...middlewares),
        typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !=='undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__(): (f)=>f,
    )
    // compose는 미들웨어들을 합성하는 것
    const store = createStore(reducer, initialState, enhancer)
    return store
})(NodeBird)
// next에 redux 붙히는 건 다르다.
// next에 붙히려면 next-redux-wrapper를 사용
