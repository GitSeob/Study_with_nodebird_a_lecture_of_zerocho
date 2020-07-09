import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  const dispatch = useDispatch()

  const onScroll = useCallback(() => {
    // window.scrollY = 현재 위치
    // document.documentElement.clientHeight = 화면 높이
    // document.documentElement.scrollHeight = 제일 위 ~ 제일 아래 길이
    if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if(hasMorePost){
        const lastId = mainPosts[mainPosts.length -1].id
        dispatch({
          type: LOAD_MAIN_POSTS_REQUEST,
          lastId,
        })
      }
    }
    // 인피니트 스크롤링 할 때 다른 사용자가 게시글을 작성하게 되면 offset이 무너지면서 중복해서 가져오게 되는 문제가 발생할 수 있다.
    // 따라서 마지막 게시글의 id를 이용하여 해당 id 보다 작은 게시물을 불러오게 한다. ( 내림차순 이기 때문, )
    // id 뿐 아니라 시간 등의 데이터로도 이용가능하다.
  }, [hasMorePost, mainPosts.length])

  useEffect(()=>{
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [mainPosts.length]) // 컴포넌트가 처음 실행될 때 addEventListener를 달아주고 컴포넌트가 사라질때 removeEventListener를 달아준다
  // onScroll을 쓰기 때문에 강력하게 캐싱하지 않기 위해 ,, 
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