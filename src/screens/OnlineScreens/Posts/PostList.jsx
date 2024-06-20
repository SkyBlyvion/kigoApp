import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiRoot, apiUrl } from '../../../constants/apiConstant';
import PageLoader from '../../../components/loader/PageLoader';
import { Link } from 'react-router-dom';

const Posts = () => {
  const TYPE_PROJECT = 1;
  const TYPE_PARTICIPATION = 2;
  const TYPE_INSPIRATION = 3;
  const TYPE_REALIZATION = 4;

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null); // État pour le post sélectionné
  const [filter, setFilter] = useState(''); // État pour le filtre actuel

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/posts`);
        const postsData = response.data['hydra:member'];

        // Fetch media for each post and correct the URL if necessary
        const postsWithMedia = await Promise.all(postsData.map(async (post) => {
          if (post.media) {
            const mediaUrl = `${apiRoot}${post.media.replace(`${apiUrl}/api`, '')}`;
            const mediaResponse = await axios.get(mediaUrl);
            post.mediaDetails = mediaResponse.data;
          }
          return post;
        }));

        // Trier les posts par date de création décroissante
        //postsWithMedia.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setPosts(postsWithMedia);
        setFilteredPosts(postsWithMedia);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
    if (type === '') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.type === type));
    }
  };

  console.log(filteredPosts);
  if (loading) return <PageLoader />;

  return (
    <div className="flex flex-col items-center h-screen overflow-y-auto p-4 pb-20">
      {/* Barre de navigation et icône de création de post */}
      <div className="p-4 w-full flex justify-between items-center">
        <h1 className="text-2xl text-orange font-bold">Posts</h1>
        <Link to="/CreatePost">
          <img src="../../../../documentation/svg/plus.svg" alt="Créer un post" className="w-8 h-8" />
        </Link>
      </div>
      <div className="flex justify-center gap-2 pb-4 flex-wrap">
        <button onClick={() => handleFilterChange('')} className={`px-4 py-2 rounded-full ${filter === '' ? 'bg-orange text-white' : 'bg-gray-300'}`}>Tous</button>
        <button onClick={() => handleFilterChange(TYPE_PROJECT)} className={`px-4 py-2 rounded-full ${filter === TYPE_PROJECT ? 'bg-orange text-white' : 'bg-gray-300'}`}>Projets</button>
        <button onClick={() => handleFilterChange(TYPE_PARTICIPATION)} className={`px-4 py-2 rounded-full ${filter === TYPE_PARTICIPATION ? 'bg-orange text-white' : 'bg-gray-300'}`}>Participation</button>
        <button onClick={() => handleFilterChange(TYPE_INSPIRATION)} className={`px-4 py-2 rounded-full ${filter === TYPE_INSPIRATION ? 'bg-orange text-white' : 'bg-gray-300'}`}>Inspirations</button>
        <button onClick={() => handleFilterChange(TYPE_REALIZATION)} className={`px-4 py-2 rounded-full ${filter === TYPE_REALIZATION ? 'bg-orange text-white' : 'bg-gray-300'}`}>Réalisations</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 ">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white shadow-md rounded overflow-hidden border-2 border-orange" onClick={() => handlePostClick(post)}>
            {post.mediaDetails && (
              <img src={`http://api_kigo.lndo.site/images/postImages/${post.mediaDetails.url_img}`} 
                alt={post.mediaDetails.label} 
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-bold">{post.title}</h2>
              <p className="text-gray-600">{post.text.slice(0, 100)}...</p>
              <p className="text-sm text-gray-500">Posté le {new Date(post?.created_date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
            <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={closeModal}>
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
            <p className="mb-4">{selectedPost.text}</p>
            <p className="text-sm text-gray-500">Posté le {new Date(selectedPost.created_date).toLocaleDateString()}</p>
            {selectedPost.mediaDetails && (
              <img src={`http://api_kigo.lndo.site/images/postImages/${selectedPost.mediaDetails.url_img}`} 
                alt={selectedPost.mediaDetails.label} 
                className="w-full max-h-96 object-cover"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
