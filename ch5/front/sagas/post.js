import { all, fork, put, delay, takeLatest, call } from 'redux-saga/effects'
import { 
    ADD_POST_REQUEST, 
    ADD_POST_SUCCESS, 
    ADD_POST_FAILURE, 
    ADD_COMMENT_SUCCESS, 
    ADD_COMMENT_FAILURE, 
    ADD_COMMENT_REQUEST, 
    LOAD_MAIN_POSTS_REQUEST, 
    LOAD_MAIN_POSTS_SUCCESS, 
    LOAD_MAIN_POSTS_FAILURE 
} from '../reducers/post';
import axios from 'axios'

function loadMainPostsAPI(){
    return axios.get('/posts') // 로그인하지 않아도 게시글을 볼 수 있는 경우에는 withCrediential 안넣어도 된다.
}

function* loadMainPosts(action){
    try{
        const result = yield call(loadMainPostsAPI)
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data: result.data
        })
    } catch(e){
        yield put({
            type: LOAD_MAIN_POSTS_FAILURE,
            error: e
        })
    }
}

function* watchLoadMainPosts(){
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts)
}

function addPostAPI(postData){
    return axios.post('/post/', postData, {
        withCredentials: true
    })
}

function* addPost(action){
    try{
        const result = yield call(addPostAPI, action.data)
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data
        })
    } catch(e){
        yield put({
            type: ADD_POST_FAILURE,
            error: e
        })
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

function addCommentAPI(){

}

function* addComment(action){
    try{
        yield delay(2000)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId
            }
        })
    } catch(e){
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e
        })
    }
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSage(){
    yield all([
        fork(watchLoadMainPosts),
        fork(watchAddPost),
        fork(watchAddComment)
    ])
}