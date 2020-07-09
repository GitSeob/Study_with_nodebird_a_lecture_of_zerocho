// 왜 import react를 안해주냐 ? Next는 안해줘도 된다.

import React from 'react'
import Link from 'next/link'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'

const Home = () => {
    return(
        <>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js" />
            </Head>
            <AppLayout>
                <div>Hello Next!</div>
            </AppLayout>
        </>
    )
}

export default Home