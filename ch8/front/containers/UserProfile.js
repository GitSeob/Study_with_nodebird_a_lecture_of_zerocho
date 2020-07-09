import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { LOG_OUT_REQUEST } from '../reducers/user';
import Link from 'next/link'

const dummy = {
    nickname: 'anjoy',
    Post: [],
    Followings: [],
    Followers: [],
    isLoggedIn: false
}

const UserProfile = () => {
    const { me } = useSelector(state=>state.user)
    const dispatch = useDispatch()

    const onLogout = useCallback(()=>{ 
        dispatch({
            type: LOG_OUT_REQUEST
        })
    }, [])

    return (
        <Card
            actions={[
                <Link href="/profile" key="twit" prefetch>
                    <a>
                        <div>
                            짹짹<br />
                            {me.Posts.length}
                        </div>
                    </a>
                </Link>,
                <Link href="/profile"  key="following" prefetch>
                    <a>
                        <div>
                            팔로잉 <br />
                            {me.Followings.length}
                        </div>
                    </a>
                </Link>,
                <Link href="/profile" key="follower" prefetch>
                    <a>
                        <div>
                            팔로워<br/>
                            {me.Followers.length}
                        </div>
                    </a>
                </Link>
            ]}
        >
            <Card.Meta 
                    avatar={<Avatar>{me.nickname[0]}</Avatar>}
                    title={me.nickname}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
};

UserProfile.propTypes = {
    
};

export default UserProfile;