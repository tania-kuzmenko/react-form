import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
};

export const PostList: React.FC<Props> = ({ posts }) => (
  <table className="box table is-striped is-narrow">
    <thead>
      <tr className="has-background-link-light">
        <th>#</th>
        <th>Title</th>
        <th>User Id</th>
        <th>User Name</th>
        <th>User Email</th>
      </tr>
    </thead>

    <tbody>
      {posts.map(post => (
        <tr key={post.id}>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>{post.userId}</td>
          <td>{post.user?.name}</td>
          <td>{post.user?.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
);