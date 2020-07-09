export const initialState = {
    isLoggedIn: false, // 로그인 여부
    isLoggingOut: false, // 로그아웃 시도중
    isLoggingIn: false, // 로그인 시도중
    logInErrorReason: '', // 로그인 에러 사유
    isSignedUp: false, // 회원가입 성공
    isSigningUp: false, // 회원가입 시도중
    signUpErrorReason: '', // 회원가입 에러 사유
    me: null, // 내정보
    followingList: [], // 팔로잉 리스트
    follwerList: [], // 팔로워 리스트
    userInfo: null, // 남의 정보
}

const dummyUser = {
    nickname: 'anjoy',
    Post: [],
    Followings: [],
    Followers: [],
}

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const LOAD_FOLLOW_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_FOLLOW_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_FOLLOW_FAILURE = 'LOAD_USER_FAILURE'

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST'
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS'
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE'

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST'
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS'
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE'


export const INCREMENT_NUMBER = 'INCREMENT_NUMBER'
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'



// ################################################################################
// ################################################################################
// ################################################################################



export const signUpRequestAction = (data) => ({
    type: SIGN_UP_REQUEST,
    data,
})

export const signUpSuccess = {
    type: SIGN_UP_SUCCESS
}

export const loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data,
})

export const logoutRequestAction = {
    type: LOG_OUT_REQUEST,
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case LOG_IN_REQUEST:{
            return{
                ...state,
                isLoggingIn: true,
                logInErrorReason: '',
            }
        }
        case LOG_IN_SUCCESS:{
            return{
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me : action.data,
                isLoading: false,
            }
        }
        case LOG_IN_FAILURE:{
            return{
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
                logInErrorReason: action.error,
                me: null,
                isLoading: false,
            }
        }
        
        case LOG_OUT_REQUEST:{
            return{
                ...state,
                isLoggingOut: true
            }
        }
        case LOG_OUT_SUCCESS:{
            return{
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                me: null
            }
        }
        case LOG_OUT_FAILURE:{
            return{
                ...state,
                isLoggingOut: false,
            }
        }

        case LOAD_USER_REQUEST: {
            return {
              ...state,
            };
        }
        case LOAD_USER_SUCCESS: {
            return {
              ...state,
              me: action.data,
            };
        }
        case LOAD_USER_FAILURE: {
            return {
              ...state,
            };
        }

        case SIGN_UP_REQUEST:{
            return {
                ...state,
                isSigningUp: true
            }
        }
        case SIGN_UP_SUCCESS:{
            return {
                ...state,
                isSigningUp: false,
                isSignedUp: true,
            }
        }
        case SIGN_UP_FAILURE:{
            return {
                ...state,
                isSigningUp: false,
                isSignedUp: false,
                signUpErrorReason: action.error,
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