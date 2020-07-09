import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  const dispatch = useDispatch()
  const countRef = useRef([])

  const onScroll = useCallback(() => {
    if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if(hasMorePost){
        let lastId = mainPosts[mainPosts.length -1].id
        if(!countRef.current.includes(lastId)){
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId,
          })
          countRef.current.push(lastId)
        } // 한번 보낸 lastId를 다시 보내지 않게 프론트에서 차단
      } 
    }
  }, [hasMorePost, mainPosts.length])

  useEffect(()=>{
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [mainPosts.length]) 
  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map((c) => {
        return (
          <PostCard key={(c.id)} post={c} />
        ); 
      })}
    </div>
  );
};

Home.getInitialProps = async ( context ) => { // context =  _app.js에서 보내준 ctx 
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  }) // 무턱대고 이렇게 서버사이드 랜더링을 하면 정보가 안옴 => _app.js에서 saga에 대한 설정을 해야함
}

export default Home;