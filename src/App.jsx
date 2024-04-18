import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { USER_INFOS } from './constants/appConstant';
import { useAuthContext } from './contexts/AuthContext';
import { checkUser } from './services/userService';


const App = () => {

  // on recupere les données de l'user depuis le localstorage
  const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));

  // on recupere le hook de navigation
  const navigate = useNavigate();
  const {signOut} = useAuthContext();
  
  const fetchUser = async () => {
    const user = await checkUser(userInfo);
    if(user){
      return;
    }else{
      signOut();
      navigate('/');
    }
  }
  
  useEffect(() => {
    fetchUser();
  }, [userInfo])
    

  return (
    <Outlet />
  )
}

export default App