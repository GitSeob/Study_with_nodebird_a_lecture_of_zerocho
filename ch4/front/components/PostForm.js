import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, } from 'antd'
import { useSelector } from 'react-redux'

const PostForm = () => {
    const { imagePaths } = useSelector(state=>state.post)

    return (
        <Form style={{ marginBottom: 20}}>
                <Input.TextArea maxLength={140} placeholder="오늘은 어떤 일이 있었나요?" />
                <div>
                    <Button>이미지 업로드</Button>
                    <Button type="primary" style={{ float: 'right'}} htmlFor="submit">짹짹</Button>
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