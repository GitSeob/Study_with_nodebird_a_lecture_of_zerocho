import React from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar } from 'antd'

const dummy = {
    nickname: 'anjoy',
    Post: [],
    Followings: [],
    Followers: [],
    isLoggedIn: false
}

const UserProfile = props => {
    return (
        <Card
            actions={[
                <div key="twit">짹짹<br />{dummy.Post.length}</div>,
                <div key="twit">팔로잉<br />{dummy.Post.length}</div>,
                <div key="twit">팔로워<br />{dummy.Post.length}</div>,
        ]}>
            <Card.Meta 
                    avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                    title={dummy.nickname}
            />
        </Card>
    );
};

UserProfile.propTypes = {
    
};

export default UserProfile;