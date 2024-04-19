import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"



// Rayon de l'application (Store)
const store = configureStore({
    // ajouter les reducers ici
    reducer: {
        user: userReducer,
    }
})

export default store