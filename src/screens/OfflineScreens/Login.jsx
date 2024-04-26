import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import ButtonLoader from '../../components/loader/ButtonLoader';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../contexts/AuthContext';
import { apiRoot } from '../../constants/apiConstant';
import GoSVG from '/documentation/svg/GO.svg'; // Import the SVG


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // on recupére la méthode signIn de notre context d'authentification
  const { signIn } = useAuthContext();
  // on recupere le hook de navigation de react-router afin de redireger l'utilisateur
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault() // empêche le fonctionnement par defaut du formulaire
    // console.log({ email, password });

    setIsLoading(true);
    // route de l'api; class RegistrationController
    axios.post(`${apiRoot}/login`, {
      email,
      password
    }).then((response) => {
      console.log('response', response);
      if (response.data.email) {
        const user = {
          userId: response.data.id,
          email: response.data.email,
          lastname: response.data.lastname,
          firstname: response.data.firstname
        }

        try {
          signIn(user);
          setIsLoading(false);
          navigate('/');
        } catch (error) {
          setIsLoading(false);
          console.log(`Erreur lors de la tentative de création : ${error}`);
        }
      } else {
        setIsLoading(false);
        console.log(`Erreur lors de la response server : ${response}`);
      }
    }).catch((error) => {
      setIsLoading(false);
      console.log(`Erreur lors de l'enregistrement de l'user : ${error}`);
    })
  }

  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-white relative'>

      <div className="mb-5 mt-5">
        <img src="/documentation/logos/logo.png" alt="Kigo Logo" />
      </div>
      <h3 className='font-bold '>Connexion</h3>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        {/* input pour l'email */}
        <CustomInput state={email} label="Email" type="email" callable={(event) => setEmail(event.target.value)} />
        {/* input pour password */}
        <CustomInput state={password} label="Mot de passe" type="password" callable={(event) => setPassword(event.target.value)} />
        <Link to='/' className=" hover:text-orange">Mot de passe oublié ?</Link>


        <div className='flex items-center justify-center pt-10'>
          {isLoading ? <ButtonLoader /> :
            <button type='submit' className=' text-white  '>
              <img src={GoSVG} alt="Go" />
            </button>}
        </div>
        <Link to='/register' className='flex items-center justify-center pt-3 text-black font-bold hover:text-orange'> S'enregistrer</Link>

      </form>

    </div>
  )
}

export default Login