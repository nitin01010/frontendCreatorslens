import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isSignup
        ? "https://api.creatorslens.in/api/v1/user/register"
        : "https://api.creatorslens.in/api/v1/user/login";

      const payload = isSignup
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        : { email: formData.email, password: formData.password };

      const response = await axios.post(url, payload);

      // Handle signup
      if (isSignup) {
        // If registration was successful, navigate to login page
        toast.success(response.data.message);
        navigate("/account/admin");
        setFormData({ name: "", email: "", password: "" });
      } else {
        if (response.data.status === "active") {
          toast.success(response.data.message);
          const token = response.data.token;
          if (token) {
            Cookies.set("user", token, { expires: 1 }); // Expires in 1 day
          }
          navigate("/account/admin");
        } else {
          toast.error("Your account is not active.");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-[80%] sm:w-[50%] m-auto mt-5 bg-white p-6 py-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Create Account" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={toggleMode}
            className="text-blue-500 hover:underline ml-1"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default CreateAccount;
