import { createContext, useContext, useState } from "react";
import { USER_INFOS } from "../constants/appConstant";

// création du context d'authentification
const AuthContext = createContext({
    userId: '', // state
    email: '', // state
    lastname: '',
    firstname: '',
    setUserId: () => {}, // method to update state userId
    setEmail: () => {}, // method to update state email
    setLastName: () => {}, // method to update state lastname
    setFirstName: () => {}, // method to update state firstname
    signIn: async () => {}, // method to sign in
    singOut: async () => {}, // method to sign out
});

// on définit toute la mécanique de notre contexte
const AuthContextProvider = ({children}) => {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [lastname, setLastName] = useState('');
    const [firstname, setFirstName] = useState('');

    const signIn = async (user) => {
        try {
            setUserId(user.userId);
            setEmail(user.email);
            setLastName(user.lastname);
            setFirstName(user.firstname);
            localStorage.setItem(USER_INFOS, JSON.stringify(user));
        } catch (error) {
            throw new Error(`Error while signing in: ${error}`);
        }
    }

    const signOut = async () => {
        try {
            setUserId('');
            setEmail('');
            setLastName('');
            setFirstName('');
            localStorage.removeItem(USER_INFOS);
        } catch (error) {
            throw new Error(`Error while signing out: ${error}`);
        }

    }

    const value = {
        userId,
        email,
        lastname,
        firstname,
        setLastName,
        setFirstName,
        setUserId,
        setEmail,
        signIn,
        signOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

// Creation de notre propre hook pour utiliser le contexte d'authentification
const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext }