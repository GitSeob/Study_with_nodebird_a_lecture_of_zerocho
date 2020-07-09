// 왜 import react를 안해주냐 ? Next는 안해줘도 된다.

import React, { useEffect } from 'react'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, logoutAction } from '../reducers/user'

const Home = () => {
    const dispatch = useDispatch()
    const { isLoggiedIn } = useSelector( state => state.user)
    // const { isLoggiedIn } = useSelector(state=>state.user.isLoggiedIn)
    const { mainPosts } = useSelector( state => state.post )

    useEffect(()=>{
        // dispatch(loginAction)
        // dispatch(logoutAction)
        // dispatch(loginAction)
    }, [])
    
    return(
        <div>
            {isLoggiedIn && <PostForm />}
            {mainPosts.map((c)=>{
                return (
                    <PostCard key={c} post={c} />
                )
            })}
        </div>
    )
}

export default Home