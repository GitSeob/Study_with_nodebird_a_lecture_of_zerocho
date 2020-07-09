import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link'
import Router from 'next/router'
import { Menu, Input, Row, Col, Card, Avatar } from 'antd';
import LoginForm from '../containers/LoginForm'
import UserProfile from '../containers/UserProfile'
import { useSelector, useDispatch } from 'react-redux'
import { LOAD_USER_REQUEST } from '../reducers/user';

const AppLayout = ({ children }) => {
    const { isLoggedIn, me } = useSelector(state=>state.user)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(!me){
            dispatch({
                type:LOAD_USER_REQUEST
            })
        }
    }, [])

    const onSearch = ( value ) => {
        Router.push({ pathname: '/hashtag', query: { tag: value }}, `/hashtag/${value}`)
    }
// prefetch 가 담긴 화면을 미리 next가 로드해주어서 이동할 때 시간을 단축할 수 있다.
    return ( 
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile" prefetch><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search 
                        enterButton 
                        style={{
                            verticalAlign: 'middle'
                        }}
                        onSearch={onSearch}
                    />
                </Menu.Item>
            </Menu>
            <Row gutter={10}>
                <Col xs={24} md={6}>
                {me
                    ? <UserProfile /> :
                    <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <Link href="https://naver.com"><a target="_blank">NAVER</a></Link>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node,
}

// AppLayout.getInitialProps

export default AppLayout;