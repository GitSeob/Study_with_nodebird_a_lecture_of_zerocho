// 왜 import react를 안해주냐 ? Next는 안해줘도 된다.

import React, {map} from 'react'
import Link from 'next/link'
import { Form, Input, Button, Card, Icon, Avatar } from 'antd'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'

const dummy = {
    isLoggiedIn: true,
    imagePaths: [],
    mainPosts: [{
        User: {
            id: 1,
            nickname: 'anjoy',
        },
        content: '첫 번째 게시글',
        img: 'https://cafeptthumb-phinf.pstatic.net/MjAxODEwMTdfMTEy/MDAxNTM5Nzc5MDQyNDgz.1c9fV0imO8toanzl4DG-9fb4-MLMbodpjdpApsBIbEAg.hgaKF2X2cmiO-hYT7T98uqXoNUenEshBmCdkoSLc7Zog.JPEG.ajjj12345/IMG_20181017_204128.jpg?type=w740',
    }],
}

const Home = () => {
    return(
        <>
            {dummy.isLoggiedIn && <PostForm />}
            {dummy.mainPosts.map((c)=>{
                return (
                    <PostCard key={c} post={c} />
                )
            })}
        </>
    )
}

export default Home