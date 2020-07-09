import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import withRedux from 'next-redux-wrapper'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers'
import { Provider } from 'react-redux'
import sagaMiddleware from '../sagas/middleware'
import rootSaga from '../sagas'

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

export default withRedux((initialState, options) => {
    const middlewares = [sagaMiddleware]
    // saga에서 제공하는 createSagaMiddleware를 이용하여 생성하고
    const enhancer = process.env.NODE_ENV === 'production' 
        ? compose(applyMiddleware(...middlewares), )
        : compose(
            applyMiddleware(...middlewares),
            typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !=='undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__(): (f)=>f,
            // 위의 REDUX_DEVTOOLS부분은 실제 배포시 빼주어야 한다. 
    )
    const store = createStore(reducer, initialState, enhancer)
    sagaMiddleware.run(rootSaga)
    // run함수를 이용하여 rootSaga를 연결해준다.
    return store
})(NodeBird)