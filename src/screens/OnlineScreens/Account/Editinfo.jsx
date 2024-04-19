import React, { useState } from 'react'
import CustomInput from '../../../components/CustomInput'
import ButtonLoader from '../../../components/loader/ButtonLoader'
import { useAuthContext } from '../../../contexts/AuthContext'
import { USER_INFOS } from '../../../constants/appConstant'
import { checkUser } from '../../../services/userService'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { apiRoot, apiUrl } from '../../../constants/apiConstant'

const Editinfo = () => {

    const { userId, email, nickname, signOut, signIn } = useAuthContext();
    const navigate = useNavigate();
    const [nicknameValue, setNicknameValue] = useState(nickname);
    const [emailValue, setEmailValue] = useState(email);
    const [passwordValue, setPasswordValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // on vérifie que l'user en session est bien le même que celui en bdd
            const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));
            const userValid = await checkUser(userInfo);
            if (userValid) {
                // on veifie que tous les champs osient remplis
                if (emailValue.length > 0 && nicknameValue.length > 0 && passwordValue.length > 0) {
                    // on se crée un tableau pour verifier le mot de passe ( checkPassword )
                    const dataCheck = {
                        id: userId,
                        password: passwordValue,
                    }

                    // on crée un objet pour le patch sans prendr ele mdp
                    const data = {
                        email: emailValue,
                        nickname: nicknameValue
                    }

                    const headers = {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }

                    try {
                        // requete qui verifie si le mdp est correct
                        const respPassword = await axios.post(`${apiRoot}/ckeck-password`, dataCheck, { headers });
                        if (respPassword.data.response) {
                            try {
                                // requete qui verifie si l'email est déja utilisée
                                const respEmail = await axios.get(`${apiUrl}/users?email=${emailValue}`);
                                //TODO: verifier des trucs en plus
                                if (emailValue !== email && respEmail.data['hydra:member'].length > 0) {
                                    setError('Cet email est déjà utilisé');
                                    return;
                                } else {
                                    try {
                                        axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
                                        //méthode qui modifie les infos de l'user
                                        const resp = await axios.patch(`${apiUrl}/users/${userId}`, data);
                                        // on reconstruit l'objet user pour mettre a jour les valeurs du contexte auth
                                        const user = {
                                            userId: resp.data.id,
                                            email: resp.data.email,
                                            nickname: resp.data.nickname
                                        };
                                        // mise a jour du constexte d'authentification
                                        signIn(user);
                                        // on redirige vers la page de compte
                                        navigate(`/account/${userId}`);

                                    } catch (error) {
                                        console.log(`Erreur sur la requete de modification des infos : ${error}`)

                                    }
                                }

                            } catch (error) {
                                console.log(`error check email : ${error}`)
                            }

                        } else {
                            setError('Mot de passe incorrect');
                            return;
                        }

                    } catch (error) {
                        console.log(`error check password : ${error}`)
                    }

                } else {
                    setError('Veuillez remplir tous les champs');
                    return;
                }

            } else {
                // on disconnect
                signOut();
                // on redirige vers la page de connexion
                navigate('/login');
            }

        } catch (error) {

        }
    }

    return (
        <div className='flex flex-1 flex-col h-screen justify-start items-center bg-black'>
            <h2 className='text-white font-bold text-xl py-5'>Mettre à jour votre compte</h2>
            <div className='text-red-600 fony-bold mb-4'>{error}</div>
            <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
                {/* input pour le nickname */}
                <CustomInput state={nicknameValue} label="Votre Pseudo" type="text" callable={(event) => setNicknameValue(event.target.value)} />
                {/* input pour l'email */}
                <CustomInput state={emailValue} label="Votre Email" type="email" callable={(event) => setEmailValue(event.target.value)} />
                {/* input pour password */}
                <CustomInput state={passwordValue} label="Votre Password" type="password" callable={(event) => setPasswordValue(event.target.value)} />

                <div className='flex items-center justify-center pt-5'>
                    {isLoading ? <ButtonLoader /> :
                        <button type='submit' className='bg-green hover:bg-green_top text-white font-bold py-2 px-4 rounded'>
                            Mettre à jour
                        </button>}
                </div>
            </form>
        </div>
    )
}

export default Editinfo