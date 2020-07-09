import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd'

const NicknameEditForm = props => {
    const onSubmitForm = useCallback(()=>{
        e.preventDefault()
        console.log('hi')
    }, [])

    return (
        <Form onSubmit={onSubmitForm} style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'}}>
            <Input addonBefore="닉네임" />
            <Button type="primary" htmlType="submit">수정</Button>
        </Form>
    );
};

NicknameEditForm.propTypes = {
    
};

export default NicknameEditForm;