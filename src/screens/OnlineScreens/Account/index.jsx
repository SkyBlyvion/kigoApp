import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUserData } from '../../../redux/user/userSelector';
import { fetchUser } from '../../../redux/user/userSlice';
import PageLoader from '../../../components/loader/PageLoader';
import { apiUrl, avatarUrl, imageUrl, apiRoot } from '../../../constants/apiConstant';
import { BsBehance, BsGithub, BsInstagram, BsLinkedin, BsMicrosoftTeams } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { FaSoundcloud } from 'react-icons/fa';
import axios from 'axios';

// Define post types
const TYPE_PROJECT = 1;
const TYPE_PARTICIPATION = 2;
const TYPE_INSPIRATION = 3;
const TYPE_REALIZATION = 4;

const Account = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;
  const { loading, user } = useSelector(selectUserData);

  const [isEditing, setIsEditing] = useState(false);
  const [biography, setBiography] = useState('');
  const [isEditingReve, setIsEditingReve] = useState(false);
  const [reve, setReve] = useState('');
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (user) {
      setBiography(user.biographie ?? '');
      setReve(user.reve ?? '');
    }
  }, [user]);

  useEffect(() => {
    const fetchProjectsAndPosts = async () => {
      try {
        const [projectsResponse, postsResponse] = await Promise.all([
          axios.get(`${apiUrl}/projects?users=${userId}&groups=project:read`),
          axios.get(`${apiUrl}/posts?user=${userId}`)
        ]);

        const projectsData = projectsResponse.data['hydra:member'];

        const projectsWithDetails = await Promise.all(projectsData.map(async (project) => {
          // Fetch competences details
          const competencesDetails = await Promise.all(
            project.competences.map(async (competenceUrl) => {
              const competenceResponse = await axios.get(`${apiRoot}${competenceUrl}`);
              return competenceResponse.data;
            })
          );

          // Fetch filieres details
          const filieresDetails = await Promise.all(
            project.filieres.map(async (filiereUrl) => {
              const filiereResponse = await axios.get(`${apiRoot}${filiereUrl}`);
              return filiereResponse.data;
            })
          );

          // Fetch users details
          const usersDetails = await Promise.all(
            project.users.map(async (userUrl) => {
              const userResponse = await axios.get(`${apiRoot}${userUrl}`);
              return userResponse.data;
            })
          );

          // Fetch post details
          const postResponse = await axios.get(`${apiRoot}${project.post}`);
          const postDetails = postResponse.data;

          // Fetch media details
          let mediaDetails = null;
          if (postDetails.media) {
            const mediaResponse = await axios.get(`${apiRoot}${postDetails.media}`);
            mediaDetails = mediaResponse.data;
          }

          return {
            ...project,
            competences: competencesDetails,
            filieres: filieresDetails,
            users: usersDetails,
            postDetails,
            mediaDetails,
          };
        }));

        setProjects(projectsWithDetails);
        setPosts(postsResponse.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching projects or posts:', error);
      }
    };

    fetchProjectsAndPosts();
  }, [userId]);

  const handleBiographyClick = () => {
    setIsEditing(true);
  };

  const handleBiographyChange = (event) => {
    setBiography(event.target.value);
  };

  const handleSaveBiography = async () => {
    try {
      await axios.patch(
        `${apiUrl}/users/${userId}`,
        { biographie: biography },
        {
          headers: {
            'Content-Type': 'application/merge-patch+json',
          }
        }
      );
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating biography:', error);
    }
  };

  const handleReveClick = () => {
    setIsEditingReve(true);
  };

  const handleReveChange = (event) => {
    setReve(event.target.value);
  };

  const handleSaveReve = async () => {
    try {
      await axios.patch(
        `${apiUrl}/users/${userId}`,
        { reve: reve },
        {
          headers: {
            'Content-Type': 'application/merge-patch+json',
          }
        }
      );
      setIsEditingReve(false);
    } catch (error) {
      console.error('Error updating reve:', error);
    }
  };

  const imgPath = user?.avatar?.imagePath
    ? `${avatarUrl}/${user?.avatar?.imagePath}`
    : `${imageUrl}/user.png`;

  const socialLinks = user?.contacts?.map(contact => ({
    type: contact.type.label,
    value: contact.value,
  })) ?? [];

  const socialIcons = {
    teams: <BsMicrosoftTeams />,
    linkedin: <BsLinkedin />,
    instagram: <BsInstagram />,
    behance: <BsBehance />,
    github: <BsGithub />,
    soundcloud: <FaSoundcloud />,
  };

  if (loading) return <PageLoader />

  console.log(projects)
  return (
    <div className="flex flex-col items-center overflow-y-auto ">
      <div className='flex flex-col items-center bg-orange w-full pb-4'>
        <div className="p-4 w-full flex justify-between items-center">
          <Link to="/settings">
            <img src="../../../../documentation/svg/setting.svg" alt="setting" className="text-2xl" />
          </Link>
          <Link to="/edit-info">
            <img src="../../../../documentation/svg/edit.svg" alt="edit" className="text-2xl" />
          </Link>
        </div>
        <div className="relative w-36 h-36 flex flex-col items-center translate-y-[40%]">
          <img src={imgPath} alt="avatar user" className='object-contain rounded-full' />
        </div>
      </div>
      <div className='pt-[10%]'>
        <h1 className="text-2xl text-orange font-bold">
          {user?.lastname ?? 'Pas de lastname'} {user?.firstname ?? 'Pas de firstname'}
        </h1>
      </div>
      <div className="flex space-x-2 my-2 items-center">
        <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm">
          profession: {user?.filiere?.label ?? 'Aucune filière'}
        </span>
        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm flex items-center">
          <img src="../../../../documentation/logos/icons8-green-dot-48.png" alt="green dot" className="h-4 w-4 mr-1" />
          Disponible
        </span>
      </div>
      <div className="flex flex-col items-center">
        <div className='flex justify-center items-center'>
          {isEditing ? (
            <textarea
              value={biography}
              onChange={handleBiographyChange}
              onBlur={handleSaveBiography}
              className="border-2 border-orange text-orange px-2 py-3 rounded-xl shadow max-w-xs text-center text-sm"
            />
          ) : (
            <p
              onClick={handleBiographyClick}
              className="border-2 border-orange text-orange px-2 py-3 rounded-xl shadow max-w-xs text-center text-sm"
            >
              {biography || 'Ajouter une biographie'}
            </p>
          )}
        </div>
      </div>
      <div className='flex justify-center items-center'>
        {isEditingReve ? (
          <textarea
            value={reve}
            onChange={handleReveChange}
            onBlur={handleSaveReve}
            className="border-2 border-orange text-orange px-2 py-3 rounded-xl shadow max-w-xs text-center text-sm"
          />
        ) : (
          <p
            onClick={handleReveClick}
            className="border-orange border-b-1 text-orange px-2 text-xs pt-3"
          >
            {reve || 'Ajouter un rêve'}
          </p>
        )}
      </div>
      <div className="flex flex-row my-4 border-2 border-orange bg-gradient-to-b from-white to-white_2 px-2 py-2 rounded-xl shadow">
        <div>
          <p className="text-lg text-orange font-sans py-1">Réseaux :</p>
          <div className="flex flex-row space-x-4 items-center">
            {socialLinks.map(link => (
              link.value && (
                <a key={link.type} href={link.value} className="icon-large text-orange rounded-xl">
                  {socialIcons[link.type.toLowerCase()] ?? <FiUser />}
                </a>
              )
            ))}
          </div>
        </div>
      </div>
      {/* Liste de post */}
      <div className="flex flex-col items-center mb-20">
        <p className='text-left text-lg text-orange font-sans py-1'>Mes projets portés:</p>
        <div className="flex flex-row space-x-4">
          {projects.map(project => (
            <div key={project.id} className="border-2 border-orange p-2 rounded-xl shadow">
              <Link to={`/project/${project.id}`} className="text-orange">Titre:{project.postDetails.title} Text:{project.postDetails.text} Type:{project.postDetails.type}</Link>
            </div>
          ))}
        </div>
        <p className='text-left text-lg text-orange font-sans py-1'>Mes Posts de participation:</p>
        <div className="flex flex-row space-x-4 w-5/6">
          {posts.filter(post => post.type === TYPE_PARTICIPATION).map(post => (
            <div key={post.id} className="border-2 border-green p-2 rounded-xl shadow">
              <Link to={`/post/${post.id}`} className="text-green">{post.title}{post.text}</Link>
            </div>
          ))}
        </div>
        <p className='text-left text-lg text-orange font-sans py-1'>Mes Posts d'inspirations:</p>
        <div className="flex flex-row space-x-4 w-5/6">
          {posts.filter(post => post.type === TYPE_INSPIRATION).map(post => (
            <div key={post.id} className="border-2 border-green p-2 rounded-xl shadow">
              <Link to={`/post/${post.id}`} className="text-green">{post.title}{post.text}</Link>
            </div>
          ))}
        </div>
        <h1 className='text-left text-lg text-orange font-sans py-1'>Mes Posts de réalisations:</h1>
        <div className="flex flex-row space-x-4 w-5/6">
          {posts.filter(post => post.type === TYPE_REALIZATION).map(post => (
            <div key={post.id} className="border-2 border-green p-2 rounded-xl shadow">
              <Link to={`/post/${post.id}`} className="text-green">{post.title}{post.text}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Account;
