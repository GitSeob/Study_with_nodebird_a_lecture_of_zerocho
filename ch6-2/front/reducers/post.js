export const initialState = {
    mainPosts: [], // 화면에 보일 포스트들
    imagePaths: [], // 미리보기 이미지 경로
    addPostErrorReason: '', // 포스트 업로드 실패 사유
    isAddingPost: false, // 포스트 업로드 중
    postAdded: false, 
    isAddingComment: false,
    commentAdded: false,
    addCommentErrorReason: '',
}

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST'
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS'
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE'

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST'
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS'
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE'

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST'
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS'
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const REMOVE_IMAGE = 'REMOVE_IMAGE'

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST'
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS'
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST'
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE'

export const RETWEET_REQUEST = 'RETWEET_REQUEST'
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS'
export const RETWEET_FAILURE = 'RETWEET_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST'
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS'
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'

// + 포스트 수정

export const ADD_DUMMY = 'ADD_DUMMY'


const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_POST_REQUEST:{
            return{
                ...state,
                isAddingPost: true,
                addCommentErrorReason: '',
                postAdded: false
            }
        }
        case ADD_POST_SUCCESS:{
            return{
                ...state,
                isAddingPost: false,
                mainPosts: [action.data, ...state.mainPosts],
                postAdded: true,
                addPostErrorReason: '',
                imagePaths: []
            }
        }
        case ADD_POST_FAILURE:{
            return{
                ...state,
                isAddingComment: false,
                addPostErrorReason: action.error,
                isAddingPost: false
            }
        }

        case LOAD_USER_POSTS_REQUEST:
        case LOAD_HASHTAG_POSTS_REQUEST:
        case LOAD_MAIN_POSTS_REQUEST: {
            return {
              ...state,
              mainPosts: [],
            };
        }

        case LOAD_HASHTAG_POSTS_SUCCESS:
        case LOAD_USER_POSTS_SUCCESS:
        case LOAD_MAIN_POSTS_SUCCESS: {
            return {
              ...state,
              mainPosts: action.data,
            };
        }

        case LOAD_HASHTAG_POSTS_FAILURE:
        case LOAD_USER_POSTS_FAILURE:
        case LOAD_MAIN_POSTS_FAILURE: {
            return {
              ...state,
            };
        }


        case ADD_COMMENT_REQUEST:{
            return{
                ...state,
                isAddingComment: true,
                addCommentErrorReason: '',
                commentAdded: false,
            }
        }
        case ADD_COMMENT_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId)
            const post = state.mainPosts[postIndex]
            const Comments = [...post.Comments, action.data.comment]
            const mainPosts = [...state.mainPosts]
            mainPosts[postIndex] = { ...post, Comments }
            // 불변성을 위해 위 같이 수행한다.
            return{
                ...state,
                isAddingComment: false,
                mainPosts,
                commentAdded: true,
            }
        }
        case ADD_COMMENT_FAILURE:{
            return{
                ...state,
                isAddingComment: false,
                addCommentErrorReason: action.error
            }
        }

        case LOAD_COMMENTS_SUCCESS: {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId)
            const post = state.mainPosts[postIndex]
            const Comments = action.data.comments
            const mainPosts = [...state.mainPosts]
            mainPosts[postIndex] = { ...post, Comments }
            return {
                ...state,
                mainPosts,
            }
        }

        case UPLOAD_IMAGES_REQUEST:{
            return{
                ...state,
            }
        }
        case UPLOAD_IMAGES_SUCCESS:{
            return{
                ...state,
                imagePaths: [ ...state.imagePaths, ...action.data ],
            }
        }
        case UPLOAD_IMAGES_FAILURE:{
            return{
                ...state,
            }
        }

        case REMOVE_IMAGE:{
            return {
                ...state,
                imagePaths: state.imagePaths.filter((v,i)=> i !== action.index) // 해당 index 필터링 된다.
            }
        }

        case LIKE_POST_REQUEST:{
            return{
                ...state,
            }
        }
        case LIKE_POST_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = [{ id: action.data.userId }, ...post.Likers];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Likers };
            return {
                ...state,
                mainPosts,
            };
        }
        case LIKE_POST_FAILURE:{
            return{
                ...state,
            }
        }

        case UNLIKE_POST_REQUEST:{
            return{
                ...state,
            }
        }
        case UNLIKE_POST_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = post.Likers.filter(v => v.id !== action.data.userId); // 좋아요 누른 목록에서 자신의 아이디를 제외한다.
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Likers };
            return {
                ...state,
                mainPosts,
            }
        }

        case UNLIKE_POST_FAILURE:{
            return{
                ...state,
            }
        }

        case RETWEET_REQUEST:{
            return{
                ...state,
            }
        }
        case RETWEET_SUCCESS:{
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            }
        }

        case RETWEET_FAILURE:{
            return{
                ...state,
            }
        }

        case ADD_DUMMY:{
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts]
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer

//reducer만들때 switch 문에 항상 default추가해주어야한다.