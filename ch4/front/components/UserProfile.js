import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { logoutAction } from '../reducers/user';

const dummy = {
    nickname: 'anjoy',
    Post: [],
    Followings: [],
    Followers: [],
    isLoggedIn: false
}

const UserProfile = props => {
    const { user } = useSelector(state=>state.user)
    const dispatch = useDispatch()

    const onLogout = useCallback(()=>{
        dispatch(logoutAction)
    }, [])

    return (
        <Card
            actions={[
                <div key="twit">짹짹<br />{user.Post.length}</div>,
                <div key="twit">팔로잉<br />{user.Post.length}</div>,
                <div key="twit">팔로워<br />{user.Post.length}</div>,
        ]}>
            <Card.Meta 
                    avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                    title={dummy.nickname}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
};

UserProfile.propTypes = {
    
};

export default UserProfile;