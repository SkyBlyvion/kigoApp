// src/redux/posts/postSelector.js

import { createSelector } from "@reduxjs/toolkit";

const selectLoading = state => state.posts.loading;
const selectPosts = state => state.posts.posts;

export const selectPostData = createSelector(
    [selectLoading, selectPosts],
    (loading, posts) => ({ loading, posts })
);
