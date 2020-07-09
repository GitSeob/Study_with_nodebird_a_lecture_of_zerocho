import { all, fork, call, takeLatest, takeEvery, put, delay, take } from 'redux-saga/effects'
import axios from 'axios'
import {
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE
} from '../reducers/user';

function signUpAPI(signUpData){
    console.log('api');
    return axios.post('/user/', signUpData)
}

function* signUp(action){
    try{
        yield call(signUpAPI, action.data)
        yield put({
            type: SIGN_UP_SUCCESS
        })
    } catch(e){
        console.error(e)
        yield put({
            type: SIGN_UP_FAILURE,
            error: e
        })
    }
}

function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function loginAPI(loginData){
    return axios.post('/user/login', loginData, {
        withCredentials: true, // 도메인간 쿠키 주고 받을 수 있음
    })
}

function* login(action){
    try{
        const result = yield call(loginAPI, action.data)
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        })
    } catch(e){
        console.error(e)
        yield put({
            type: LOG_IN_FAILURE,
        })
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login)
}

function loadUserAPI(){
    return axios.get('/user/', {
        withCredentials: true,
    })
}
function* loadUser(){
    try{
        const result = yield call(loadUserAPI)
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data
        })
    } catch(e){
        console.error(e)
        yield put({
            type: LOAD_USER_FAILURE,
            errer: e
        })
    }
}
function* watchLoadUser(){
    yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

function logoutAPI(){
    return axios.post('/user/logout', {}, { // post는 데이터가 없더라도 비어있는 객체를 꼭 넣어주어야 한다.
        withCredentials: true, // 도메인간 쿠키 주고 받을 수 있음
    })
}

function* logout(action){
    try{
        yield call(logoutAPI)
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch(e){
        console.error(e)
        yield put({
            type: LOG_OUT_FAILURE,
        })
    }
}

function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logout)
}

export default function* userSage(){
    yield all([
        fork(watchSignUp),
        fork(watchLogin),
        fork(watchLoadUser),
        fork(watchLogout),
    ])
}
// API함수는 제네레이터로 선언해서는 안된다 ㅅㅂ 1시간동안 고생함
