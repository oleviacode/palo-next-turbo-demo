'use client';

import { useCallback, useContext, useState } from 'react';
import { MobxContext } from '../../templates/Providers';
import { notFound, useRouter } from 'next/navigation';
import Subtitle from '../../atoms/Subtitle-TW';
import PostForm from '../PostForm';

const EditPostFormMobx = ({ id }: { id: string }) => {
  const router = useRouter();
  const postStore = useContext(MobxContext);
  const initialPost = postStore.getPostById(id);
  if (!initialPost) {
    notFound();
  }
  const [title, setTitle] = useState(initialPost.title);
  const [content, setContent] = useState(initialPost.content);

  const onTitleChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    [],
  );

  const onContentChanged = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    [],
  );

  const onSavePostClicked = useCallback((title: string, content: string) => {
    if (title && content) {
      postStore.updatePost({ id, title, content });
      router.push(`/mobx/post/${id}`);
    }
  }, []);

  return (
    <>
      <Subtitle subtitle="Edit Post" />
      <PostForm
        title={title}
        titleAction={onTitleChanged}
        content={content}
        contentAction={onContentChanged}
        saveAction={onSavePostClicked}
      />
    </>
  );
};

export default EditPostFormMobx;