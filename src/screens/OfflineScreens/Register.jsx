import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '../../components/CustomInput'
import axios from 'axios';
import { apiRoot } from '../../constants/apiConstant';
import { useAuthContext } from '../../contexts/AuthContext';
import ButtonLoader from '../../components/loader/ButtonLoader';
import GoSVG from '/documentation/svg/GO.svg'; // Import the SVG

const Register = () => {

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // on récupére la méthode signIn de notre context d'authentification
  const { signIn } = useAuthContext();
  // on recupere le hook de navigation de react-router afin de redireger l'utilisateur
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault() // empêche le fonctionnement par defaut du formulaire
    // console.log({ lastName, firstName, email, password });
    setIsLoading(true);
    // route de l'api; class RegistrationController
    axios.post(`${apiRoot}/register`, {
      lastName,
      firstName,
      email,
      password
    }).then((response) => {
      if (response.data.email) {
        const user = {
          userId: response.data.id,
          email: response.data.email


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
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-white'>
      <div className="mb-5 mt-5">
        <img src="/documentation/logos/logo.png" alt="Kigo Logo" />
      </div>
      <h3 className='font-bold'>S'enregistrer</h3>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        {/* input pour le nom */}
        <CustomInput state={lastName} label="Nom" type="text" callable={(event) => setLastName(event.target.value)} />
        {/* input pour le prenom */}
        <CustomInput state={firstName} label="Prenom" type="text" callable={(event) => setFirstName(event.target.value)} />
        {/* input pour l'email */}
        <CustomInput state={email} label="Email" type="email" callable={(event) => setEmail(event.target.value)} />
        {/* input pour password */}
        <CustomInput state={password} label="Mot de passe" type="password" callable={(event) => setPassword(event.target.value)} />

        <p className='text-black'>Vous avez déja un compte ?<Link to='/' className='text-black font-bold hover:text-green'> Se connecter</Link></p>
        <div className='flex items-center justify-center pt-10'>
          {isLoading ? <ButtonLoader /> :
            <button type='submit' className=' text-white  '>
              <img src={GoSVG} alt="Go" />
            </button>}
        </div>
      </form>
    </div>

  )
}

export default Register