export const initialState = {
    mainPosts: [{
        User: {
            id: 1,
            nickname: 'anjoy',
        },
        content: '첫 번째 게시글',
        img: 'https://cafeptthumb-phinf.pstatic.net/MjAxODEwMTdfMTEy/MDAxNTM5Nzc5MDQyNDgz.1c9fV0imO8toanzl4DG-9fb4-MLMbodpjdpApsBIbEAg.hgaKF2X2cmiO-hYT7T98uqXoNUenEshBmCdkoSLc7Zog.JPEG.ajjj12345/IMG_20181017_204128.jpg?type=w740', 
    }],
    imagePaths: []
}

const ADD_POST = 'ADD_POST'
const ADD_DUMMY = 'ADD_DUMMY'

const addPost = {  
    type: ADD_POST
}
const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: 'Hello',
        UserId: 1,
        User: {
            nickname: 'anjoy'
        }
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_POST:{
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