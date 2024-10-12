import React, { useContext, useEffect, useState } from "react";
import { addComment, deleteComment, deletePost } from "../axios";
import { redirect, useParams } from "react-router-dom";

import AuthContext from "../services/AuthContext";
import axios from "axios";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState(""); // State for new comment
  const { user } = useContext(AuthContext); // Get authenticated user

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const res = await axios.get(`http://localhost:8000/api/posts/${postId}`);
    setPost(res.data);
  };

  const handleEdit = () => {
    window.location.href = `/posts/${postId}/edit`;
  };

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      window.location.href = "/posts";
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      await addComment(postId, { comment: newComment }); // Send comment as JSON
      setNewComment(""); // Clear the input field
      fetchPost(); // Refresh the post to show the new comment
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      fetchPost(); // Refresh the post to remove the deleted comment
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-4">
        {user && (user.id === post.user_id || user.role === "admin") && (
          <div className="mt-4 flex space-x-2 justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p>{post.content}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Comments</h3>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-2 rounded mt-2">
                <h3 className="text-sm font-semibold text-gray-700 mt-2 pb-3">
                  Author:{" "}
                  <span className="text-blue-500">
                    {comment.user_name !== null ? comment.user_name : "Guest"}
                  </span>
                </h3>
                <p>{comment.comment}</p>
                {user &&
                  (user.id === comment.user_id ||
                    user.id === post.user_id ||
                    user.role === "admin") && (
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
          <div className="mt-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
