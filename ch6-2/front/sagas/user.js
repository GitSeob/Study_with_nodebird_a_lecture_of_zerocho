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
    LOAD_USER_FAILURE, 
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILURE,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILURE,
    UNFOLLOW_USER_REQUEST,
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS,
    REMOVE_FOLLOWER_FAILURE,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWINGS_FAILURE,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    EDIT_NICKNAME_REQUEST,
    EDIT_NICKNAME_SUCCESS,
    EDIT_NICKNAME_FAILURE
} from '../reducers/user';

function signUpAPI(signUpData){
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

function loadUserAPI(userId) {
    // 서버에 요청을 보내는 부분
    return axios.get(userId ? `/user/${userId}` : '/user/', {
      withCredentials: true,
    });
  }
  
  function* loadUser(action) {
    try {
      // yield call(loadUserAPI);
      const result = yield call(loadUserAPI, action.data);
      yield put({ // put은 dispatch 동일
        type: LOAD_USER_SUCCESS,
        data: result.data,
        me: !action.data,
      });
    } catch (e) { // loginAPI 실패
      console.error(e);
      yield put({
        type: LOAD_USER_FAILURE,
        error: e,
      });
    }
  }
  
  function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
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

function followAPI(userId) {
    // 서버에 요청을 보내는 부분
    return axios.post(`/user/${userId}/follow`, {}, {
      withCredentials: true,
    });
  }
  
  function* follow(action) {
    try {
      // yield call(followAPI);
      const result = yield call(followAPI, action.data);
      yield put({ // put은 dispatch 동일
        type: FOLLOW_USER_SUCCESS,
        data: result.data,
      });
    } catch (e) { // loginAPI 실패
      console.error(e);
      yield put({
        type: FOLLOW_USER_FAILURE,
        error: e,
      });
    }
  }
  
  function* watchFollow() {
    yield takeEvery(FOLLOW_USER_REQUEST, follow);
  }

function unfollowAPI(userId){
    return axios.delete(`/user/${userId}/follow`, { 
        withCredentials: true, 
    })
}

function* unfollow(action){
    try{
        const result = yield call(unfollowAPI, action.data)
        yield put({
            type: UNFOLLOW_USER_SUCCESS,
            data: result.data
        })
    } catch(e){
        console.error(e)
        yield put({
            type: UNFOLLOW_USER_FAILURE,
            error: e
        })
    }
}

function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_USER_REQUEST, unfollow)
}

function loadFollowersAPI(userId){
    return axios.get(`/user/${userId}/followers`, { 
        withCredentials: true, 
    })
}

function* loadFollowers(action){
    try{
        const result = yield call(loadFollowersAPI, action.data)
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data
        })
    } catch(e){
        console.error(e)
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: e
        })
    }
}

function* watchLoadFollowers(){
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers)
}

function loadFollowingsAPI(userId){
    return axios.get(`/user/${userId}/followings`, { 
        withCredentials: true, 
    })
}

function* loadFollowings(action){
    try{
        const result = yield call(loadFollowingsAPI, action.data)
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data
        })
    } catch(e){
        console.error(e)
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: e
        })
    }
}

function* watchLoadFollowings(){
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings)
}

function removeFollowerAPI(userId){
    return axios.delete(`/user/${userId}/follower`, { 
        withCredentials: true, 
    })
}

function* removeFollower(action){
    try{
        const result = yield call(removeFollowerAPI, action.data)
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data
        })
    } catch(e){
        console.error(e)
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: e
        })
    }
}

function* watchRemoveFollower(){
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower)
}

function editNicknameAPI(nickname){
    return axios.patch(`/user/nickname`, {nickname}, { 
        withCredentials: true, 
    })
}

function* editNickname(action){
    try{
        const result = yield call(editNicknameAPI, action.data)
        yield put({
            type: EDIT_NICKNAME_SUCCESS,
            data: result.data
        })
        alert('닉네임 변경이 완료되었습니다.')
    } catch(e){
        console.error(e)
        yield put({
            type: EDIT_NICKNAME_FAILURE,
            error: e
        })
    }
}

function* watchEditNickname(){
    yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname)
}

export default function* userSage(){
    yield all([
        fork(watchSignUp),
        fork(watchLogin),
        fork(watchLoadUser),
        fork(watchLogout),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),
        fork(watchEditNickname),
    ])
}