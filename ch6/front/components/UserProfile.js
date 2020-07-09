import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { logoutRequestAction } from '../reducers/user';

const dummy = {
    nickname: 'anjoy',
    Post: [],
    Followings: [],
    Followers: [],
    isLoggedIn: false
}

const UserProfile = props => {
    const { me } = useSelector(state=>state.user)
    const dispatch = useDispatch()

    const onLogout = useCallback(()=>{ 
        dispatch(logoutRequestAction)
    }, [])

    return (
        <Card
            actions={[
                
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