import { Calendar, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ data, indx }) => {
  const navigate = useNavigate();
  const formattedDate = new Date(data?.createdAt).toLocaleDateString();

  return (
    <div className="bg-white mt-5 w-full p-2 rounded-md">
      <img
        src={
          data?.imageUrl ||
          "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90-1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
        }
        className="object-cover h-48 w-full rounded-md shadow-xl md:w-96"
      />
      <h1
        onClick={() => navigate(`/post/${data?._id}`)}
        className="text-xl p-2 cursor-pointer hover:text-blue-500 font-medium mt-2"
      >
        {data?.title}
      </h1>
      <p className="p-2 text-gray-400">
        {data?.content.split(" ").slice(0, 20).join(" ")}
        {data?.content.split(" ").length > 20 ? "..." : ""}
      </p>
      <hr className="mb-3 mt-2 m-auto" />
      <div className="flex justify-between py-2">
        <div className="px-2 flex gap-2">
          <User size={20} color="gray" />
          <p className="text-gray-400 text-sm">{data?.author?.slice(-6)}</p>
        </div>
        <div className="px-2 flex gap-2">
          <Calendar size={20} color="gray" />
          <p className="text-gray-400 text-sm">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
