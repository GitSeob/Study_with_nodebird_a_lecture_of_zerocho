import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'

const NodeBird = ({ Component }) => {
    return(
        <>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js" />
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
        </>
    )
}

NodeBird.propTypes = {
    Component: PropTypes.elementType,
}
// react는 받아오는 props의 타입을 검증하는 기능을 제공한다

export default NodeBird

// next에서 pages폴더 안에 _app.js를 사용하면 자동으로 next에서
// layout을 해준다. 모든 페이지에서 중복되는 부분을 몰아 사용.
// 그리고 Component props를 사용
