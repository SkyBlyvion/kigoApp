import { createContext, useContext, useState } from "react";
import { USER_INFOS } from "../constants/appConstant";

// création du context d'authentification
const AuthContext = createContext({
    userId: '', // state
    email: '', // state
    nickname: '', // state
    setUserId: () => {}, // method to update state userId
    setEmail: () => {}, // method to update state email
    setNickname: () => {}, // method to update state nickname
    signIn: async () => {}, // method to sign in
    singOut: async () => {}, // method to sign out
});

// on définit toute la mécanique de notre contexte
const AuthContextProvider = ({children}) => {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');

    const signIn = async (user) => {
        try {
            setUserId(user.userId);
            setEmail(user.email);
            setNickname(user.nickname);
            localStorage.setItem(USER_INFOS, JSON.stringify(user));
        } catch (error) {
            throw new Error(`Error while signing in: ${error}`);
        }
    }

    const signOut = async () => {
        try {
            setUserId('');
            setEmail('');
            setNickname('');
            localStorage.removeItem(USER_INFOS);
        } catch (error) {
            throw new Error(`Error while signing out: ${error}`);
        }

    }

    const value = {
        userId,
        email,
        nickname,
        setUserId,
        setEmail,
        setNickname,
        signIn,
        signOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

// Creation de notre propre hook pour utiliser le contexte d'authentification
const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext }