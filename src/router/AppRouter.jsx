import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext';
import { RouterProvider } from 'react-router-dom';
import OnlineRouter from './OnlineRouter';
import OfflineRouter from './OfflineRouter';
import { USER_INFOS } from '../constants/appConstant';

// si one est connecté on affiche le composant Home sinon on affiche le composant Login
// creation d'un mini context pour la session

// creation du context
const SessionContext = createContext({
    inSession: false
});

// création du hook pour utiliser le contexte de session
// fonction annonyme auto return
export const useSessionContext = () => useContext(SessionContext);

const AppRouter = () => {

    // on déclare notre state session
    const [inSession, setInSession] = useState(null);
    
    // on recupere les infos de notre authContext
    const { userId, setUserId, setEmail, setNickname} = useAuthContext();

    // on va regarder si on a des infos dans le localstorage
    const getUserInfos = async () => {
        const user = JSON.parse(localStorage.getItem(USER_INFOS));

        // on verifie si on a des infos utilisateur en localstorage
        if(user){
            setUserId(user.userId);
            setEmail(user.email);
            setNickname(user.nickname);
            setInSession(true); // true signifie que l'utilisateur est connecté
        }else{
            setInSession(false); // personne en session, false
        }
    };

    // on va appeler getUserInfos dés que l'on monte le composant
    // useEffect() prend le pas sur le montage des composants
    useEffect(()=> {
        getUserInfos();
    },[userId]);

    const value = {
        inSession
    }

  return (
    // on recupere le context de session
    <SessionContext.Provider value={value}>
        {/* on appelle le bon routeur suivant le contexte de session */}
        <RouterProvider router={inSession ? OnlineRouter : OfflineRouter}/>
    </SessionContext.Provider>
  )
}

export default AppRouter