import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle } from "lucide-react";
import dateIcon from "../../../assets/schedule.png";
import locationIcon from "../../../assets/location.png";

import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { MdReportProblem, MdCheckCircle } from "react-icons/md";

const Latest = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("https://ph-assignment-11-server-murex.vercel.app/latestPost")
      .then((res) => setPosts(res.data));
  }, []);
  return (
    <div className=" pt-7 pb-7 bg-[#F3F4F6]">
      <h1 className="text-center text-4xl font-bold pb-5">
        Latest Lost & Found Post
      </h1>
      <div className="w-11/12 mx-auto grid md:grid-cols-3 gap-3">
        {posts.map((post) => (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4 transition-all hover:shadow-xl border border-gray-200">
            {/* image */}
            <img
              src={post.thumbnail}
              className="h-40 w-full object-cover rounded-lg"
              alt={post.title}
            />

            {/* title */}
            <h3 className="text-lg font-semibold text-gray-800 mt-2">
              {post.title}
            </h3>

            {/* Lost or Found status checks */}
            <p className="flex items-center text-sm mt-1 font-medium">
              {post.postType === "Lost" ? (
                <MdReportProblem className="text-red-500 mr-1 text-lg" />
              ) : (
                <MdCheckCircle className="text-green-500 mr-1 text-lg" />
              )}
              <span
                className={
                  post.postType === "Lost" ? "text-red-500" : "text-green-500"
                }
              >
                {post.postType}
              </span>
            </p>

            {/* location */}
            <p className="flex items-center text-sm text-gray-600 mt-1">
              <FaMapMarkerAlt className="mr-1 text-gray-500" /> {post.location}
            </p>

            {/* date */}
            <p className="flex items-center text-sm text-gray-600 mt-1">
              <FaCalendarAlt className="mr-1 text-gray-500" /> {post.date}
            </p>

            {/* view details button*/}
            <Link to={`/items/${post._id}`}>
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
      <p className="flex justify-center items-center mt-3">
        <Link
          to="/allItems"
          className="bg-blue-500 font-bold py-2 px-4 rounded-lg text-white shadow-xl mt-6"
        >
          View more..
        </Link>
      </p>
    </div>
  );
};

export default Latest;
