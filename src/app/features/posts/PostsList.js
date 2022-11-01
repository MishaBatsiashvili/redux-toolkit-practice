import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRemoved, selectAllPosts } from "./postsSlice";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

export const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <button onClick={() => dispatch(postRemoved(post.id))}>Remove</button>
      <Link to={`/post/${post.id}`}>
        <button>View Post</button>
      </Link>
      <Link to={`/post/${post.id}/edit`}>
        <button>Edit Post</button>
      </Link>
      <TimeAgo timestamp={post.date} />
      <h3>{post.title}</h3>
      <PostAuthor userId={post?.userId} />
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
