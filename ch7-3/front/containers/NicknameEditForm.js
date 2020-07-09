import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = props => {
    const [ editedName, setEditedName ] = useState('')
    const dispatch = useDispatch()
    const { me } = useSelector(state=>state.user)
    
    const onChangeNickname = useCallback((e)=>{
        setEditedName(e.target.value)
    }, [])

    const onEditNickname = useCallback((e)=>{
        e.preventDefault()
        dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: editedName,
        })
    }, [editedName])

    return (
        <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'}} onSubmit={onEditNickname}>
            <Input addonBefore="닉네임"  value={editedName || ( me && me.nickname ) } onChange={onChangeNickname} />
            <Button type="primary" htmlType="submit">수정</Button>
        </Form>
    );
};

NicknameEditForm.propTypes = {
    
};

export default NicknameEditForm;