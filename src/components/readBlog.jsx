import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // If not already installed, run `npm install axios`
import SideBar from "./sideBar";
import Navbar from "./navbar";
import Footer from "./footer";

const ReadBlog = () => {
  const { id } = useParams(); // Get the id from the URL
  const [post, setPost] = useState(null); // State to store post data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to store error

  useEffect(() => {
    // Make the API call to fetch the post by id
    const fetchPost = async () => {
      try {
        const response = await axios.post("https://api.creatorslens.in/api/v1/blogs/getPostById", { id });
        setPost(response.data); // Store post data in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError("Failed to fetch post.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]); // Re-run the effect if the id changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <>
      <Navbar />
      <div className="w-[100%] flex-wrap md:w-[80%] mt-4 md:flex-nowrap flex gap-5 m-auto">
        <div className="w-[98%] m-auto bg-white py-5 rounded p-1 md:w-[60%]">
          <div className="p-2">
              
            <p className="text-2xl font-semibold py-2  mb-3">{post.title}</p>

            <img
              src={post.imageUrl}
              alt={post.title}
              className="object-cover w-[100%] shadow-xl m-auto h-[400px] rounded"
            />
            
            <p className="text-end text-sm text-gray-400  mt-5">{new Date(post.createdAt).toLocaleDateString()}</p>


            <div className="py-2 " dangerouslySetInnerHTML={{ __html: post.content }} />

          </div>
        </div>
        <SideBar />
      </div>
      <Footer />
    </>
  );
};

export default ReadBlog;
