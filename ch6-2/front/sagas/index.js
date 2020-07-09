import { all, call } from 'redux-saga/effects'
import axios from 'axios'
import user from './user'
import post from './post'

axios.defaults.baseURL = 'http://localhost:3065/api' // 공통되는 부분을 default 설정하여 제거함

export default function* rootSaga(){
    yield all([
        call(user),
        call(post),
    ])
}