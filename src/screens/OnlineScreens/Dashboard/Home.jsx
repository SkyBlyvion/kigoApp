import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { USER_INFOS } from '../../../constants/appConstant';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../../../redux/user/userSelector';
import { fetchUser } from '../../../redux/user/userSlice';
import PageLoader from '../../../components/loader/PageLoader';
import { MdOutlineAddCircle } from 'react-icons/md';

const Home = () => {
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem(USER_INFOS)).userId;

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  // on recupere les states
  const { loading, user } = useSelector(selectUserData);

  if (loading) return <PageLoader />

  return (
    <div className="flex flex-col items-center container mx-auto p-4 font-aeonik">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-xl text-orange mb-6">Bonjour {user?.lastname} {user?.firstname}</p>

      {/* Section Projets */}
      <div className="w-4/6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Projets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to='/project' className='bg-orange text-white font-bold py-2 px-4 rounded text-center'>Liste des projets</Link>
          <Link to='/createproject' className='bg-orange text-white font-bold py-2 px-4 rounded text-center'>Ajout de Projet / Porter</Link>
          <Link to='/projectsuggestion' className='bg-orange text-white font-bold py-2 px-4 rounded text-center'>Suggestion de projet</Link>
        </div>
      </div>

      {/* Section Posts */}
      <div className="w-4/6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to='/post' className='bg-green text-white font-bold py-2 px-4 rounded text-center'>Liste des posts BTN</Link>
          <Link to='/createpost' className='bg-green text-white font-bold py-2 px-4 rounded text-center'>Ajout de Post BTN</Link>
        </div>
      </div>

      {/* Section Profil */}
      <div className="w-4/6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Profil</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to={`/account/${id}`} className='bg-orange text-white font-bold py-2 px-4 rounded text-center'>Mon profil BTN</Link>
        </div>
      </div>

      <Link to="/project" className="mt-8">
        <MdOutlineAddCircle className="w-14 h-14 text-orange" />
      </Link>
    </div>
  );
};

export default Home;
