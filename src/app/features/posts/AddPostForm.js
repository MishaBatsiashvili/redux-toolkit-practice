import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const users = useSelector((state) => state.users);
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAddNewPost = () => {
    if (!title || !content) {
      return;
    }

    console.log(userId, "userId");
    dispatch(postAdded(title, content, userId));

    setTitle("");
    setContent("");
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const userOptions = (
    <>
      <option value="">Select Author</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </>
  );

  return (
    <section>
      <h2>Add a New Post</h2>
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
        <label htmlFor="postContent">Author:</label>
        <select
          id="userId"
          name="userId"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        >
          {userOptions}
        </select>
        <button type="button" onClick={onAddNewPost} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
