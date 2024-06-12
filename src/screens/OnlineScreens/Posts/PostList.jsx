import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../constants/apiConstant';
import PageLoader from '../../../components/loader/PageLoader';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/posts`);
        setPosts(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="flex flex-col items-center">
      {/* icon reglages et edit */}
      <div className="p-4 w-full flex justify-between items-center">
        <Link to="/CreatePost">
          <img src="../../../../documentation/svg/setting.svg" alt="setting" className="text-2xl" />
        </Link>
        <Link to="/edit-info">
          <img src="../../../../documentation/svg/edit.svg" alt="edit" className="text-2xl" />
        </Link>
      </div>
      <h1 className="text-2xl text-orange font-bold">Posts</h1>
      <div className="w-full">
        {posts.map(post => (
          <div key={post.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.text}</p>
            {post.media && <img src={post.media.url} alt={post.media.label} className="mt-4" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
