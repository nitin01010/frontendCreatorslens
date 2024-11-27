import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [input, setInput] = useState(false);
  const navigate = useNavigate();

  const fetchData = async (category) => {
    try {
      const response = await axios.get(
        `https://creatorslensbackendblogs-production.up.railway.app/api/v1/blogs/getAllPosts`,
        {
          params: {
            categories: category, // Add the category as a query parameter
          },
        }
      );
      console.log(`${category} Data:`, response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="h-[80px] relative flex justify-between md:justify-around items-center bg-white shadow-md">
      <h1
        onClick={() => navigate(`/`)}
        className="text-xl font-bold px-5 md:px-0"
      >
        Creatorslens.in
      </h1>
      <Menu
        className="block md:hidden mr-5"
        onClick={() => setInput(!input)}
        size={26}
      />
      <ul className="gap-10 hidden md:flex">
        <a href="/">
        <li >Home</li>
        </a>
        <li >AI</li>
        <li >Coding</li>
      </ul>
      {input ? (
        <div className="block md:hidden transition-all ease-linear py-10 shadow-md bg-white rounded-md z-50 top-0 absolute text-white w-full">
          <X
            className="top-5 absolute right-5 transition-all ease-linear"
            onClick={() => setInput(!input)}
            color="black"
          />
          <ul className="flex flex-col gap-5 p-2">
            <a href="/">
              <li className="py-2 px-3 text-black mt-10 bg-[#f2f2f2] shadow rounded">
                Home
              </li>
            </a>
            <li
              className="py-2 px-3 text-black bg-[#f2f2f2] shadow rounded"
              onClick={() => fetchData("AI")}
            >
              AI
            </li>
            <li
              className="py-2 px-3 text-black bg-[#f2f2f2] shadow rounded"
              onClick={() => fetchData("Coding")}
            >
              Coding
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
