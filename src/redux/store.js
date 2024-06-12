import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import postReducer from "./posts/postSlice"


// Rayon de l'application (Store)
const store = configureStore({
    // ajouter les reducers ici
    reducer: {
        user: userReducer,
        post: postReducer,
    }
})

export default store