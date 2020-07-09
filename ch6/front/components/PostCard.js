import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Button, Avatar, Input, List, Form, Comment } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST } from '../reducers/post';
import Link from 'next/link'
import PostImages from './PostImages'

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false)
    const [ commentText, setCommentText ] =useState('')
    const { me } = useSelector(state=>state.user)
    const { commentAdded, isAddingComment } = useSelector(state=>state.post)
    const dispatch = useDispatch()

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev)
        if(!commentFormOpened){
            dispatch({
                type: LOAD_COMMENTS_REQUEST,
                data: post.id,
            })
        }
    }, [commentFormOpened])

    const onSubmitComment = useCallback((e) => {
        e.preventDefault()
        
        if(!me){
            return alert('댓글을 달려면 로그인이 필요합니다.')
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
                content: commentText,
            }
        })
    }, [me && me.id, commentText])

    useEffect(()=>{
        setCommentText('')
    }, [commentAdded === true])

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value)
    }, [])
    
    return (
        <div>
            <Card 
                key={+post.createdAt}
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions = {[
                    <Icon type="retweet" key="retweet" />,
                    <Icon type="heart" key="heart" />,
                    <Icon type="message" key="message" onClick={onToggleComment} />,
                    <Icon type="ellipsis" key="ellipsis" />,
                ]}
                extra={<Button>팔로우</Button>} 
            >
                <Card.Meta
                    avatar={
                        <Link 
                            href={{ 
                                pathname: '/user', 
                                query: {id: post.User.id } 
                            }}
                            as={`/user/${post.User.id}`} >
                                <a>
                                    <Avatar>{post.User.nickname[0]}</Avatar>
                                </a>
                        </Link>
                        }
                    title={post.User.nickname}
                    description={(
                        <div>{post.content.split(/(#[^\s]+)/g).map((v)=>{
                            if(v.match(/#[^/s]+/)){
                                return (
                                    <Link href={{ pathname: "/hashtag", query: { tag: v.slice(1)}}} as={`/hashtag/${v.slice(1)}`}><a>{v}</a></Link>
                                )
                            } // post.content를 split하여 정규표현식에 match되면 link로 변환한다.
                            return v
                        })}</div>
                    )} // hashtag를 링크화 - next에서는 a태그 쓰면 안되고 link 태그 써주어야 한다.
                />
            </Card>     
            {commentFormOpened && (
                <>
                    <List
                        header={`${post.Comments ? post.Comments.length : 0} 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
                        renderItem={item => (
                            <li>
                                <Comment
                                author={item.User.nickname}
                                avatar={(
                                    <Link href={{ pathname: `/user`, query: {id: item.User.id} }} as ={`/user/${item.User.id}`}>
                                        <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                                    </Link>
                                )}
                                content={item.content}
                                />
                            </li>
                        )}
                    />
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                    </Form>
                </>
            )}
        </div>       
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.string,
    }).isRequired,
};

export default PostCard;
