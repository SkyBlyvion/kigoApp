import { createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../constants/apiConstant";
import axios from "axios";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: {},
    },
    reducers:{
        setLoading: (state, action)=>{
            state.loading = action.payload;
        },
        setUser: (state, action)=>{
            state.user = action.payload
        },
    }
})

export const {setLoading, setUser} = userSlice.actions;



// méthode qui recupere les infos de l'user
// récupére l'id de l'user
export const fetchUser = (id) => async dispatch => {
    // console.log('response', id);
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${apiUrl}/users/${id}`);
        dispatch(setUser(response.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur lors de la requête fetchUser: ${error}`);
        dispatch(setLoading(false));
    }
}



export default userSlice.reducer