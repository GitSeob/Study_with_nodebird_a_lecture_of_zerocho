import React, { useState } from 'react';
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import { Form, Input, Checkbox, Button } from 'antd'

const Signup = () => {
    // const [id, setId] = useState('');
    // const [nickname, setNickname] = useState('');
    // const [password, setPassword] = useState('');

        // 위는 커스텀 훅으로 대체

    const [passwordChk, setPasswordChk] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    const [termError, setTermError] = useState(false)

    const onSubmit = (e) =>{
        e.preventDefault()
        if(password !== passwordChk) {
            return setPasswordError(true)
        }
        if(!term){
            return setTermError(true)
        }
        console.log({
            id,
            nickname,
            password,
            passwordChk,
            term
        })
        // eslint에서는 콘솔로그를 찍으면 에러를 뱉는다
        // 실제 배포 시에 성능저하가 일어나기 때문
        // 없애기 귀찬으면 webpack에서 콘솔로그 무시하는 설정하면 된다.
    }

    const useInput = (initValue = null) => {
        const [value, setter] = useState(initValue)
        const handler = (e) =>{
            setter(e.target.value)
        }
        return [value, handler]
    }
    // 위는 커스텀 훅, 위/아래 와 같이 state, setstate가 반복되는 것을 줄이기 위해,,,

    const [id, onChangeId] = useInput('')
    const [nickname, onChangeNickname] = useInput('')
    const [password, onChangePassword] = useInput('')
    // const [passwordChk, onChangePasswordChk] = useInput('')
    // const [term, onChangeTerm] = useInput(false)

    // const onChangeId = (e) => {
    //     setId(e.target.value)
    // }

    // const onChangeNickname = (e) => {
    //     setNickname(e.target.value)
    // }
    
    // const onChangePassword = (e) => {
    //     setPassword(e.target.value)
    // }

    const onChangePasswordChk = (e) => {
        setPasswordError(e.target.value !== password)
        setPasswordChk(e.target.value)
    }

    const onChangeTerm = (e) => {
        setTermError(false)
        setTerm(e.target.checked)
    }
 
    return (
        <>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js" />
            </Head>
            <AppLayout>
            <Form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nickname" >닉네임</label>
                    <br />
                    <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password" >비밀번호</label>
                    <br />
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-chk" >비밀번호확인</label>
                    <br />
                    <Input name="user-password-chk" type="password" value={passwordChk} required onChange={onChangePasswordChk}/>
                    {passwordError && <div style={{ color:'red'}}>비밀번호가 일치하지 않습니다. </div>}
                </div>
                <div>
                    <Checkbox name="user-term" value={term} onChange={onChangeTerm}>약관에 동의합니다.</Checkbox>
                    {termError && <div style={{ color:'red'}}>약관에 동의해야합니다.</div>}
                </div>
                <div style={{ marginTop:10 }}>
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </div>
            </Form>
            </AppLayout>
        </>
    );
};


export default Signup;