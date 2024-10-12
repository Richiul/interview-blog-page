import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../services/AuthContext";
import { getPosts } from "../axios";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await getPosts();
    setPosts(res);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      {isLoggedIn && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => navigate("/posts/create")}
        >
          Add Post
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            className="bg-white shadow-md rounded p-4 cursor-pointer"
            to={`/posts/${post.id}`}
          >
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.content}</p>
            <p className="text-gray-600 mt-2">Author: {post.user_name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
