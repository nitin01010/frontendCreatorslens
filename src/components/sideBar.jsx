import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Twitter, Share2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [randomPost, setRandomPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomPost = async () => {
      try {
        const response = await axios.get(
          "https://api.creatorslens.in/api/v1/blogs/getAllPosts"
        );
        setRandomPost(response.data.posts || []); // Ensure it's an empty array if no posts
      } catch (error) {
        console.error("Error fetching random post", error);
      }
    };

    fetchRandomPost();
  }, []);

  if (!randomPost.length) {
    return <div>Loading...</div>;
  }

  // Function to handle post click and navigate to post detail page
  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`); // Navigate to the post detail page
  };
  

  return (
    <div className="w-[98%] m-auto md:w-[40%] shadow md:shadow-2xl bg-white p-2 rounded-md -mt-4 md:mt-0 md:rounded-xl">
      {/* Social Plugin */}
      <div>
        <p className="px-2 font-bold py-4">Social Plugin</p>
        <div className="flex gap-6 justify-between px-2 py-2">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="cursor-pointer" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="cursor-pointer" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="cursor-pointer" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Share2 className="cursor-pointer" />
          </a>
        </div>
      </div>

      {/* Most Popular */}
      <div className="mt-2">
        <p className="px-2 font-bold py-4">Most Popular</p>
        <div className="flex flex-col gap-4">
          {randomPost.slice(0, 3).map((item) => (
            <div
              key={item._id} // Add a unique key
              className="py-3 rounded-md shadow-sm bg-[#f2f2f2] cursor-pointer"
              onClick={() => handlePostClick(item._id)} // Navigate when clicked
            >
              <p className="px-2">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mt-2">
        <p className="px-2 font-bold py-4">Categories</p>
        <div className="flex flex-wrap gap-4">
          {randomPost.slice(0, 4).map((item) => (
            <div
              key={item._id}
              className="py-3 mb-5 flex rounded-md shadow-sm bg-[#f2f2f2]"
            >
              <p className="px-2">{item.category}</p>
            </div>
          ))}
        </div>
      </div>

      <aside className="w-[68%] m-auto py-5 mt-4">
        <p className="text-gray-400 text-center">Responsive Advertisement</p>
      </aside>
    </div>
  );
};

export default SideBar;
