import React, { useContext, useState } from "react";

import AuthContext from "../services/AuthContext";
import { createNewPost } from "../axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [errors, setErrors] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddPost = async () => {
    try {
      await createNewPost(newPost, user.id);
      navigate("/posts");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error saving post:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <input
        type="text"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      {errors.title && (
        <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>
      )}
      <textarea
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        placeholder="Body"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      {errors.content && (
        <p className="text-red-500 text-xs mt-1">{errors.content[0]}</p>
      )}
      <div className="flex justify-end">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => navigate("/posts")}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddPost}
        >
          Add Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
