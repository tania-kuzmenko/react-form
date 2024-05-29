import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.scss';

import { Post } from './types/Post';
import postsFromServer from './api/posts.json';
import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';
import { getUserById } from './servises/user';

const initialPosts: Post[] = postsFromServer.map(post => ({
  ...post,
  user: getUserById(post.userId),
}));

export function getNewPostId(posts: Post[]) {
  const maxId = Math.max(...postsFromServer.map(post => post.id));

  return maxId + 1;
  //return Math.random().toFixed(12).slice(2);
};

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = ({ id, ...data }: Post) => {
    const newPost = {
      id: getNewPostId(posts),
      ...data,
    }
    setPosts(currentPosts => [...currentPosts, newPost]);
  }
  return (
    <div className="section">
      <h1 className="title">
        Create a post
      </h1>

      <PostForm onSubmit={addPost} />
      <PostList posts={posts} />
    </div>
  );
};
export default App;
