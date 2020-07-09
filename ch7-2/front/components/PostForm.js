import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useInput } from '../pages/signup'
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';


const PostForm = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const { imagePaths, isAddingPost, postAdded } = useSelector(state=>state.post)
    const { me } = useSelector(state=>state.user)
    const imageInput = useRef()

    useEffect(()=>{
        setText('')
    }, [postAdded === true])

    const onSubmitForm = useCallback((e)=>{
        e.preventDefault( )

        if(!text || !text.trim()){
            return alert('게시글을 작성하세요.')
        }
        const formData = new FormData();
        imagePaths.forEach((i)=>{
            formData.append('image', i)
        })
        formData.append('content', text)
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData
        })
    }, [text, imagePaths])

    const onChangeText = useCallback((e)=>{
        setText(e.target.value)
    }, [])

    const onChangeImages = useCallback((e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f)=>{
            imageFormData.append('image', f)
        })
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData
        })
    }, []) // 이미지만 미리 올려주기 위한 작업

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click()
    }, [imageInput.current])

    const onRemoveImage = useCallback(index=>()=> { // 고차함수
        dispatch({
            type: REMOVE_IMAGE,
            index,
        })
    }, [])

    return (
        <Form onSubmit={onSubmitForm} style={{ marginBottom: 20}} encType="multipart/form-data" >
                <Input.TextArea maxLength={140} placeholder="오늘은 어떤 일이 있었나요?" value={text} onChange={onChangeText} />
                <div>
                    <input type='file' multiple hidden ref={imageInput} onChange={onChangeImages} />
                    <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                    <Button type="primary" style={{ float: 'right'}} htmlType="submit" loading={isAddingPost}>짹짹</Button>
                </div>
                <div>
                    {imagePaths.map((v, i) => {
                        return (
                            <div key={v} style ={{ display: 'inline-block'}} >
                                <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
                                <div>
                                    <Button onClick={onRemoveImage(i)}>제거</Button>
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