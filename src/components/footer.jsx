import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Footer = () => {
  const [randomPost, setRandomPost] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchRandomPost = async () => {
      try {
        const response = await axios.get("https://creatorslensbackendblogs-production.up.railway.app/api/v1/blogs/getAllPosts");
        setRandomPost(response.data.posts);
      } catch (error) {
        console.error("Error fetching random post", error);
      }
    };

    fetchRandomPost();
  }, []);

  if (!randomPost) {
    return <div>Loading...</div>;
  }

  // Function to handle post click and navigate to post detail page
  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`); // Navigate to the post detail page
  };

  return (
    <div className="w-[98%] bg-white mb-5 shadow rounded-md md:w-[80%] mt-5 flex gap-10 justify-between   flex-wrap m-auto py-8 p-5 ">

      {/* Featured Post */}
      <div className="flex w-full md:w-[300px] flex-col gap-2">
        <p className="font-semibold text-xl text-black">Featured post</p>
        {Array.isArray(randomPost) && randomPost.map((item, index) => (
          <div key={index} className="bg-white rounded hover:bg-[#f2f2f2] p-2" onClick={() => handlePostClick(item._id)}>
            <div className="flex items-center gap-3">
              {/* Image */}
              <img src={item.imageUrl || "/default-image.jpg"} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
              <div className="flex flex-col">
                <p className="text-gray-400 text-sm">{item.title || "Lorem ipsum dolor sit amet"}</p>
                
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Most Popular */}
      <div className="flex w-full md:w-[300px] flex-col gap-2">
        <p className="font-semibold text-xl text-black">Most Popular</p>
        {Array.isArray(randomPost) && randomPost.map((item, index) => (
          <div key={index} className="bg-white rounded hover:bg-[#f2f2f2] p-2" onClick={() => handlePostClick(item._id)}>
            <div className="flex items-center gap-3">
              {/* Image */}
              <img src={item.imageUrl || "/default-image.jpg"} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
              <div className="flex flex-col">
                <p className="text-gray-400 text-sm">{item.title || "Lorem ipsum dolor sit amet"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
