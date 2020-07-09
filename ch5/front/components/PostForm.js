import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useInput } from '../pages/signup'
import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const { imagePaths, isAddingPost, postAdded } = useSelector(state=>state.post)
    const { me } = useSelector(state=>state.user)
    const { addCommentErrorReason } = useSelector(state=>state.post)

    useEffect(()=>{
        setText('')
    }, [postAdded === true])

    const onSubmitForm = useCallback((e)=>{
        e.preventDefault( )
        console.log(text)
        if(!text || !text.trim()){
            return alert('게시글을 작성하세요.')
        }
        dispatch({
            type: ADD_POST_REQUEST,
            data: {
                content: text.trim(),
                id: me.id
            }
        })
    }, [text])

    const onChangeText = useCallback((e)=>{
        setText(e.target.value)
    }, [])

    return (
        <Form onSubmit={onSubmitForm} style={{ marginBottom: 20}} encType="multipart/form-data" >
                <Input.TextArea maxLength={140} placeholder="오늘은 어떤 일이 있었나요?" value={text} onChange={onChangeText} />
                { addCommentErrorReason && <div style={{color: red}}>{addCommentErrorReason}</div>}
                <div>
                    <input type='file' multiple hidden />
                    <Button>이미지 업로드</Button>
                    <Button type="primary" style={{ float: 'right'}} htmlType="submit" loading={isAddingPost}>짹짹</Button>
                </div>
                <div>
                    {imagePaths.map((v, i) => {
                        return (
                            <div key={v} style ={{ display: 'inline-block'}} >
                                <img src={'http://localhost:3000/'+v} style={{ width: '200px' }} alt={v} />
                                <div>
                                    <Button>제거</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Form>
    );
};

PostForm.propTypes = {
    
};

export default PostForm;