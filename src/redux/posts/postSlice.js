// src/redux/posts/postSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constants/apiConstant";

const postSlice = createSlice({
    name: "posts",
    initialState: {
        loading: false,
        posts: [],
        error: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { setLoading, setPosts, setError } = postSlice.actions;

export const fetchPosts = () => async dispatch => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${apiUrl}/posts`);
        dispatch(setPosts(response.data['hydra:member']));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createPost = (post) => async dispatch => {
    dispatch(setLoading(true));
    try {
        await axios.post(`${apiUrl}/posts`, post, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(fetchPosts());
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export default postSlice.reducer;
