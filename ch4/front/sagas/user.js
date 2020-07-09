import { all, fork, call, takeLatest, takeEvery, put, delay, take } from 'redux-saga/effects'
import { SIGN_UP_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

const HELLO_SAGA = 'HELLO_SAGA'
const BYE_SAGA = 'BYE_SAGA'

function* loginAPI(){

} // 서버에 fetch하는 부분

function* login(){
    try{
        yield call(loginAPI)
        yield put({
            type: LOG_IN_SUCCESS
        })
    } catch(e){
        console.error(e)
        yield put({
            type: LOG_IN_FAILURE
        })
        // put() = dispatch() 라고 생각하면 된다.
    }
}

function* watchLogin(){
    yield takeLatest(SIGN_UP_REQUEST, login)
    // while(true){
    //     yield take(LOG_IN)
    //     // take는 ()안의 action을 기다린다. LOG_IN action이 들어오면 다음으로 넘어감
    //     yield delay(1000)
    //     yield put({
    //         type: LOG_IN_SUCCESS
    //     })
    // }   
}

function* watchHello(){
    yield takeEvery(HELLO_SAGA, function*(){
        yield put({
            type: BYE_SAGA
        })
    })
    // takeEvery는 while(true)와 같이 작동한다.
    // takeLatest는 짧은 시간내 여러번이 들어오면 1번만 작동된다.
}

export default function* userSage(){
    yield all([
        fork(watchLogin),
        fork(watchHello),
        // call과 fork의 차이
        // call은 ()내의 함수 종료까지 기다림 -> 동기호출
        // fork도 ()내의 함수 종료가 아니여도 다른 부분 수행 -> 비동기호출
    ])
    // all은 [] 안의 이벤트(?) 들 중 아무거나 기다리는 것
}