// src/screens/Account/index.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUserData } from '../../../redux/user/userSelector';
import { fetchUser } from '../../../redux/user/userSlice';
import PageLoader from '../../../components/loader/PageLoader';
import { apiUrl, avatarUrl, imageUrl, apiRoot } from '../../../constants/apiConstant';
import axios from 'axios';
import BiographyEditor from '../../../components/Account/BiographyEditor';
import DreamEditor from '../../../components/Account/DreamEditor';
import SocialLinks from '../../../components/Account/SocialLinks';
import ProjectsAndPosts from '../../../components/Account/ProjectsAndPosts';


const Account = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;
  const { loading, user } = useSelector(selectUserData);

  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId, dispatch]);

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

  const imgPath = user?.avatar?.imagePath
    ? `${avatarUrl}/${user?.avatar?.imagePath}`
    : `${imageUrl}/user.png`;

  const socialLinks = user?.contacts?.map(contact => ({
    type: contact.type.label,
    value: contact.value,
  })) ?? [];

  if (loading) return <PageLoader />

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
      <BiographyEditor userId={userId} initialBiography={user?.biographie} />
      <DreamEditor userId={userId} initialDream={user?.reve} />
      <SocialLinks socialLinks={socialLinks} />
      <ProjectsAndPosts projects={projects} posts={posts} />
    </div>
  );
}

export default Account;
