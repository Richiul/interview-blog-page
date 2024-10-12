import React, { useEffect, useState } from "react";
import { getPost, updatePost } from "../axios";

import { useParams } from "react-router-dom";

const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({ title: "", content: "" });
  const [errors, setErrors] = useState({}); // Add state for errors

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await getPost(postId);
      setPost(res.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updatePost(postId, post);
      window.location.href = `/posts/${postId}`;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors); // Set errors from response
      } else {
        console.error("Error updating post:", error);
      }
    }
  };

  const handleCancel = () => {
    window.location.href = `/posts/${postId}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
      <div className="bg-white shadow-md rounded p-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.content && (
            <p className="text-red-500 text-xs mt-1">{errors.content[0]}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
