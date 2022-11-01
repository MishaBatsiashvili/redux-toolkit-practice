import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { postUpdated, selectPostById } from "./postsSlice";

export const EditPostForm = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onUpdatedPost = () => {
    if (!post || !content) {
      return;
    }

    const updatedPostData = {
      id: post.id,
      title,
      content
    };

    dispatch(postUpdated(updatedPostData));
    history.push(`/post/${post.id}`);

    setTitle("");
    setContent("");
  };

  if (!post) {
    return <Redirect to="/" />;
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div className="navLinks">
          <Link to="/">
            <button>All Posts</button>
          </Link>
        </div>
        <form>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
          <button type="button" onClick={onUpdatedPost}>
            Save Post
          </button>
        </form>
      </article>
    </section>
  );
};
