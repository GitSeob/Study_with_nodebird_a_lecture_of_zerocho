import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, } from 'antd'

const dummy = {
    isLoggiedIn: true,
    imagePaths: [],
    mainPosts: [{
        User: {
            id: 1,
            nickname: 'anjoy',
        },
        content: '첫 번째 게시글',
        img: 'https://cafeptthumb-phinf.pstatic.net/MjAxODEwMTdfMTEy/MDAxNTM5Nzc5MDQyNDgz.1c9fV0imO8toanzl4DG-9fb4-MLMbodpjdpApsBIbEAg.hgaKF2X2cmiO-hYT7T98uqXoNUenEshBmCdkoSLc7Zog.JPEG.ajjj12345/IMG_20181017_204128.jpg?type=w740',
    }],
}

const PostForm = () => {
    return (
        <Form style={{ marginBottom: 20}}>
                <Input.TextArea maxLength={140} placeholder="오늘은 어떤 일이 있었나요?" />
                <div>
                    <Button>이미지 업로드</Button>
                    <Button type="primary" style={{ float: 'right'}} htmlFor="submit">짹짹</Button>
                </div>
                <div>
                    {dummy.imagePaths.map((v, i) => {
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