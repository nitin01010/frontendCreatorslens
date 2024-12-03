import { BadgePlus, ReceiptText, User2, Pen, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const tags = ["Web Development", "Machine Learning", "Data Science", "Cybersecurity"];
const categories = ["AI", "Coding", "Latest", "Learning"];

const Admin = () => {
  const [status, setStatus] = useState("all");
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState({
    imageUrl: "",
    title: "",
    content: "",
    tag: "",
    category: "",
  });
  const [currentPost, setCurrentPost] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { imageUrl, title, content, tag, category } = input;
    if (!imageUrl || !title || !content || !tag || !category) {
      toast.error("Please fill in all fields!");
      return;
    }
    try {
      const author = Cookies.get("user");
      const postData = { imageUrl, title, content, tag, category, author };

      if (currentPost) {
        await axios.post("https://api.creatorslens.in/api/v1/blogs/updatePost", {
          ...postData,
          id: currentPost._id,
        });
        toast.success("Post updated successfully!");
      } else {
        await axios.post("https://api.creatorslens.in/api/v1/blogs/createPost", postData);
        toast.success("Post created successfully!");
      }
      navigate("/account/admin");
      setInput({ imageUrl: "", title: "", content: "", tag: "", category: "" });
      setCurrentPost(null);
      fetchPosts(); // Refresh posts after creation or update
    } catch (error) {
      console.error("Error: ", error.response || error.message);
      toast.error("Failed to save post. Please try again.");
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://api.creatorslens.in/api/v1/blogs/getAllPosts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [status]);

  const fetchProfile = async () => {
    try {
      const token = Cookies.get("user");
      if (!token) {
        toast.error("Authentication token is missing.");
        return;
      }
      const response = await axios.post("https://api.creatorslens.in/api/v1/user/account", { token });
      setProfile(response.data.user);
    } catch (error) {
      console.error("Profile fetch error:", error.response ? error.response.data : error.message);
      toast.error("Failed to load profile data.");
    }
  };

  const handleStatus = (statusComponent, post = null) => {
    setStatus(statusComponent);
    if (statusComponent === "profile") {
      fetchProfile();
    } else if (statusComponent === "update") {
      setCurrentPost(post);
      setInput({
        imageUrl: post.imageUrl,
        title: post.title,
        content: post.content,
        tag: post.tag,
        category: post.category,
      });
    } else {
      setInput({ imageUrl: "", title: "", content: "", tag: "", category: "" });
      setCurrentPost(null);
    }
  };


  const handleDelete = async (postId) => {
    try {
      const author = Cookies.get("user");
      await axios.post(`https://api.creatorslens.in/api/v1/blogs/deletePost`,{
        id:postId,
        author
      });
      toast.success("Post deleted successfully!");
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="w-full md:w-[80%] mx-auto bg-white mt-4 rounded p-4 shadow-lg">
      <div className="flex bg-gray-100 rounded-md py-4 justify-between items-center">
        <h1 className="font-bold px-5 text-xl">CreatorsLens.in</h1>
        <User2 className="mr-4 cursor-pointer" onClick={() => handleStatus("profile")} />
      </div>

      <div className="flex gap-4 mt-4">
        <ReceiptText
          onClick={() => handleStatus("all")}
          size={30}
          className="cursor-pointer text-gray-600 hover:text-blue-500"
        />
        <BadgePlus
          onClick={() => handleStatus("create")}
          size={30}
          className="cursor-pointer text-gray-600 hover:text-blue-500"
        />
      </div>

      <div className="bg-gray-100 p-4 rounded-md mt-5 flex flex-col gap-4">
        {status === "all" && posts.length > 0 ? (
          posts.map((blog) => (
            <div key={blog._id} className="bg-white p-4 rounded-md shadow-md">
              <img src={blog?.imageUrl} class="object-cover h-48  w-full rounded-md mb-3" />
              <h2 className="text-lg font-bold">{blog.title}</h2>
              <p className="text-gray-700  mt-2">{blog.content.split(' ').slice(0, 20).join(' ')}...</p>
              <p className="text-gray-500 mt-2">
                <span className="font-semibold">Tag:</span> {blog.tag} | <span className="font-semibold">Category:</span>{" "}
                {blog.category}
              </p>
              <div className="flex gap-4 mt-2">
                <Pen
                  className="text-green-500 cursor-pointer"
                  onClick={() => handleStatus("update", blog)}
                />
                <Trash2 onClick={() => handleDelete(blog._id)}  className="text-red-500 cursor-pointer" />
              </div>
            </div>
          ))
        ) : status === "create" ? (
          <CreatePost handleSubmit={handleSubmit} input={input} handleChange={handleChange} />
        ) : status === "update" && currentPost ? (
          <UpdateComponents handleSubmit={handleSubmit} input={input} handleChange={handleChange} />
        ) : status === "profile" && profile ? (
          <div>
            <h2 className="text-xl font-bold mb-4 capitalize">{profile.name}</h2>
            <p className="py-3">Email: {profile.email}</p>
            <p className="py-3">
              Account status: <b className="text-green-400 font-bold">{profile.status}</b>
            </p>
          </div>
        ) : (
          <p className="text-center">No data to display.</p>
        )}
      </div>
    </div>
  );
};

const UpdateComponents = ({ handleSubmit, input, handleChange }) => (
  <form onSubmit={handleSubmit}>
    {/* Similar to CreatePost, use the same structure for updating */}
    <input
      type="text"
      name="imageUrl"
      value={input.imageUrl}
      onChange={handleChange}
      placeholder="Image URL"
      className="p-2 py-3 mb-3 w-full rounded-md border border-gray-300"
    />
    <input
      type="text"
      name="title"
      value={input.title}
      onChange={handleChange}
      placeholder="Enter your title"
      className="p-2 py-3 mb-3 w-full rounded-md border border-gray-300"
    />
    <textarea
      name="content"
      value={input.content}
      onChange={handleChange}
      className="mt-2 w-full h-[200px] p-2 py-3 rounded-md border border-gray-300"
      placeholder="Write your blog..."
    />
    {/* Tags & Categories */}
    <Dropdown label="Tags" options={tags} name="tag" value={input.tag} onChange={handleChange} />
    <Dropdown label="Categories" options={categories} name="category" value={input.category} onChange={handleChange} />
    {/* Submit Button */}
    <button type="submit" className="bg-blue-500 text-white font-semibold shadow-lg p-2 w-[200px] rounded-md mt-4">
      Update Post
    </button>
  </form>
);

// Reusable CreatePost Component
const CreatePost = ({ handleSubmit, input, handleChange }) => (
  <form onSubmit={handleSubmit}>
    {/* Image URL */}
    <input
      type="text"
      name="imageUrl"
      value={input.imageUrl}
      onChange={handleChange}
      placeholder="Image URL"
      className="p-2 py-3 mb-3 w-full rounded-md border border-gray-300"
    />
    {/* Title */}
    <input
      type="text"
      name="title"
      value={input.title}
      onChange={handleChange}
      placeholder="Enter your title"
      className="p-2 py-3 mb-3 w-full rounded-md border border-gray-300"
    />
    {/* Content */}
    <textarea
      name="content"
      value={input.content}
      onChange={handleChange}
      className="mt-2 w-full h-[200px] p-2 py-3 rounded-md border border-gray-300"
      placeholder="Write your blog..."
    />
    {/* Tags & Categories */}
    <Dropdown label="Tags" options={tags} name="tag" value={input.tag} onChange={handleChange} />
    <Dropdown label="Categories" options={categories} name="category" value={input.category} onChange={handleChange} />
    {/* Submit Button */}
    <button type="submit" className="bg-blue-500 text-white font-semibold shadow-lg p-2 w-[200px] rounded-md mt-4">
      Post Now
    </button>
  </form>
);

// Reusable Dropdown Component
const Dropdown = ({ label, options, name, value, onChange }) => (
  <>
    <p className="text-base py-3 font-semibold">{label}</p>
    <select name={name} value={value} onChange={onChange} className="w-full outline-none py-2 rounded-md border border-gray-300">
      <option value="">Select a {label.toLowerCase()}</option>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </>
);

export default Admin;
