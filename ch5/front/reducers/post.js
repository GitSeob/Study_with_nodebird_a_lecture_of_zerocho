export const initialState = {
    mainPosts: [{
        User: {
            id: 1,
            nickname: 'anjoy',
        },
        content: '첫 번째 게시글',
        img: 'https://cafeptthumb-phinf.pstatic.net/MjAxODEwMTdfMTEy/MDAxNTM5Nzc5MDQyNDgz.1c9fV0imO8toanzl4DG-9fb4-MLMbodpjdpApsBIbEAg.hgaKF2X2cmiO-hYT7T98uqXoNUenEshBmCdkoSLc7Zog.JPEG.ajjj12345/IMG_20181017_204128.jpg?type=w740', 
        Comments: [],
    }], // 화면에 보일 포스트들
    imagePaths: [], // 미리보기 이미지 경로
    addPostErrorReason: '', // 포스트 업로드 실패 사유
    isAddingPost: false, // 포스트 업로드 중
    postAdded: false, 
    isAddingComment: false,
    commentAdded: false,
    addCommentErrorReason: '',
}

const dummyPost = {
    id: 2,
    User: {
        id: 1,
        nickname: 'anjoy'
    },
    content: '나는 더미입니다',
    Comments: []
}

const dummyComment = {
    id: 1,
    User: {
        id: 1,
        nickname: '더미'
    },
    createdAt: new Date(),
    content: '더미 댓글입니다.'
}

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST'
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS'
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE'

export const LOAD_HASHING_POSTS_REQUEST = 'LOAD_HASHING_POSTS_REQUEST'
export const LOAD_HASHING_POSTS_SUCCESS = 'LOAD_HASHING_POSTS_SUCCESS'
export const LOAD_HASHING_POSTS_FAILURE = 'LOAD_HASHING_POSTS_FAILURE'

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
                addPostErrorReason: ''
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

        case LOAD_MAIN_POSTS_REQUEST:{
            return{
                ...state,
                mainPosts: [],
            }
        }
        case LOAD_MAIN_POSTS_SUCCESS:{
            return{
                ...state,
                mainPosts: action.data
            }
        }
        case LOAD_MAIN_POSTS_FAILURE:{
            return{
                ...state,
            }
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
            const Comments = [...post.Comments, dummyComment]
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
                isAddingPost: false,
                addCommentErrorReason: action.error
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