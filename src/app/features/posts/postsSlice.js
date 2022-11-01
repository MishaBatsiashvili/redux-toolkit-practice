import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../api/client";

// const initialState = [
//   {
//     id: "1",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     userId: "1",
//     title: "First Post!",
//     content: "Hello!",
//     reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
//   },
//   {
//     id: "2",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     userId: "1",
//     title: "Second Post",
//     content: "More text",
//     reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
//   }
// ];

const initialState = {
  posts: [],
  status: "idle",
  error: null
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            userId
          }
        };
      }
    },
    postRemoved(state, action) {
      return state.filter((post) => post.id !== action.payload);
    },
    postUpdated(state, action) {
      const { id: postId, title, content } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reactionName } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reactionName]++;
      }
    }
  }
});

// thunks
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  return response.data;
});
// /.

// selectors
export const selectAllPosts = (state) => {
  return state.posts.posts;
};
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
// /.

export const {
  postAdded,
  postRemoved,
  postUpdated,
  reactionAdded
} = postsSlice.actions;

export default postsSlice.reducer;
