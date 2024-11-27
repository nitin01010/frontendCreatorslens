import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./sideBar";
import Swipper from "./swipper";
import Card from "./card";
import Navbar from "./navbar";
import Footer from "./footer";

const Dashboard = () => {
  const [post,setPost] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://creatorslensbackendblogs-production.up.railway.app/api/v1/blogs/getAllPosts");
        setPost(response?.data?.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-[100%] flex-wrap md:w-[80%] mt-4 md:flex-nowrap flex gap-5 m-auto">
        <div className="w-[98%] m-auto p-1 md:w-[60%]">
          <Swipper />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {post.map((item, index) => {
              return <Card data={item} indx={index} />;
            })}
          </div>
        </div>
        <SideBar />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
