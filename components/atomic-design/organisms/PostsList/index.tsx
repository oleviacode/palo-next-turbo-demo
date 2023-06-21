'use client';

import React, { useEffect } from 'react';

import {
  useAppDispatch,
  useAppSelector,
} from 'store/state-management/redux/hook';
import { fetchPosts } from 'store/state-management/redux/posts/slice';

import PostCard from '../PostCard';
import Subtitle from '../../atoms/Subtitle-TW';
import { postSelectorInit } from 'store/state-management/redux/posts/selectors';

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const postSelector = postSelectorInit();
  const posts = useAppSelector(postSelector.selectAll);
  const postStatus = postSelector.getPostStatus;
  const error = postSelector.getErrorStatus;

  useEffect(() => {
    // originally we check if this data has already been fetched before by assigning it a postState
    // But because Next has a caching which detects if a data has already been fetched, there
    // may be no use for this checking.
    // But for now lets use the post status until the cache feature is fully understood
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content: JSX.Element | JSX.Element[] = <div>Loading</div>;

  if (postStatus === 'succeeded') {
    content = posts.map((post) => (
      <div key={post.id}>
        <PostCard id={post.id} title={post.title} content={post.content} />
      </div>
    ));
  } else if (postStatus === 'failed') {
    content = <>{error}</>;
  }

  return (
    <section>
      <Subtitle subtitle="Posts" />
      {content}
    </section>
  );
};

export default PostsList;