import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import ButtonLoader from '../../components/loader/ButtonLoader';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../contexts/AuthContext';
import { apiRoot } from '../../constants/apiConstant';

const Login = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  // on recupére la méthode signIn de notre context d'authentification
  const { signIn } = useAuthContext();
  // on recupere le hook de navigation de react-router afin de redireger l'utilisateur
  const navigate = useNavigate();

  const handleSubmit = (event) => { 
    event.preventDefault() // empêche le fonctionnement par defaut du formulaire

    setIsLoading(true);
    // route de l'api; class RegistrationController
    axios.post(`${apiRoot}/login`, {
      email,
      password
    }).then((response)=>{
      if(response.data.email){
        const user = {
          userId: response.data.id,
          email: response.data.email,
          nickname: response.data.nickname
        }

        try {
          signIn(user);
          setIsLoading(false);
          navigate('/');
        } catch (error) {
          setIsLoading(false);
          console.log(`Erreur lors de la tentative de création : ${error}`);
        }
      }else {
        setIsLoading(false);
        console.log(`Erreur lors de la response server : ${response}`);
      }
    }).catch((error)=>{
      setIsLoading(false);
      console.log(`Erreur lors de l'enregistrement de l'user : ${error}`);
    })
  }

  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-black'>
      <h2 className='text-white font-bold text-xl py-5'>Connexion</h2>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        {/* input pour l'email */}
        <CustomInput state={email} label="Votre Email" type="email" callable={(event) => setEmail(event.target.value)}/>
        {/* input pour password */}
        <CustomInput state={password} label="Votre Password" type="password" callable={(event) => setPassword(event.target.value)}/>

        <p className='text-white'>Vous n'avez pas de compte ?<Link to='/register' className='text-white font-bold hover:text-green'> S'enregistrer</Link></p>
          <div className='flex items-center justify-center pt-5'>
           { isLoading ? <ButtonLoader/> : 
            <button type='submit' className='bg-green hover:bg-green_top text-white font-bold py-2 px-4 rounded'>
              S'enregistrer
            </button>}
          </div>
      </form>
    </div>
  )
}

export default Login