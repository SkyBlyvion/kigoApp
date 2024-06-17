import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiRoot, apiUrl } from '../../../constants/apiConstant';
import PageLoader from '../../../components/loader/PageLoader';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

        setPosts(postsWithMedia);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  console.log('posts', posts);
  if (loading) return <PageLoader />;

  return (
    <div className="flex flex-col items-center h-screen overflow-y-auto p-4 pb-20">
      {/* icon reglages et edit */}
      <div className="p-4 w-full flex justify-between items-center">
        <Link to="/CreatePost">
          <img src="../../../../documentation/svg/plus.svg" alt="setting" className="text-2xl" />
        </Link>
        
      </div>
      <h1 className="text-2xl text-orange font-bold pb-4">Posts</h1>
      <div className="w-5/6">
        {posts.map(post => (
          <div key={post.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold">{post?.title}</h2>
            <p>{post?.text}</p>
            <p>{post?.created_date}</p>
            <p>{post?.updated_date}</p>
            <p>{post?.type}</p>
            {post.mediaDetails && (
              <div>
                <p>{post.mediaDetails.label}</p>
                <img src={`http://api_kigo.lndo.site/images/postImages/${post.mediaDetails.url_img}`} 
                  alt={post.mediaDetails.label} 
                  className="mt-4 max-w-full max-h-[200px] object-cover" 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
