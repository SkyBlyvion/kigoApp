import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../constants/apiConstant';

const PostSelectionModal = ({ isOpen, onClose, onSelect }) => {
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

    if (isOpen) {
      fetchPosts();
    }
  }, [isOpen]);

  const handleSelect = (post) => {
    onSelect(post);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Select a Post</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="mb-2">
                <button
                  className="text-blue-500 underline"
                  onClick={() => handleSelect(post)}
                >
                  {post.title}
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PostSelectionModal;
