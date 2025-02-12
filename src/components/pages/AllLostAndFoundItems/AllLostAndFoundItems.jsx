import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import dateIcon from "../../../assets/schedule.png";
import locationIcon from "../../../assets/location.png";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { IoMdClose } from "react-icons/io";

import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { MdReportProblem, MdCheckCircle } from "react-icons/md";

const AllLostAndFoundItems = () => {
  const items = useLoaderData();
  const [searchParams, setSearchParams] = useState("");
  const [posts, setPosts] = useState(items);
  // console.log(items);
  // console.log(searchParams);
  useEffect(() => {
    axios
      .get(
        `https://ph-assignment-11-server-murex.vercel.app/allItems?searchParams=${searchParams}`
      )
      .then((res) => setPosts(res.data));
  }, [searchParams]);
  return (
    <div className="pb-4 bg-[#F3F4F6]">
      {/* search input */}
      <div className="w-full md:w-1/2 mx-auto p-4 pb-7">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            onChange={(e) => setSearchParams(e.target.value)}
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="w-11/12 mx-auto grid md:grid-cols-3 gap-4">
        {posts.map((post) => (
          // <div
          //   key={post._id}
          //   className="card bg-white w-full shadow-xl rounded-lg"
          // >
          //   <figure>
          //     <img
          //       src={post.thumbnail}
          //       className="w-full h-[200px]"
          //       alt="Shoes"
          //     />
          //   </figure>
          //   <div className="pl-6">
          //     <h2 className="card-title">{post.title}</h2>
          //     <p className="flex items-center gap-2">
          //       <AlertTriangle className="w-4 " />
          //       {post.postType}
          //     </p>

          //     <p className="flex gap-2 items-center">
          //       <img src={locationIcon} alt="" className="w-4" />{" "}
          //       {post.location}
          //     </p>

          //     <p className="flex gap-2">
          //       <img src={dateIcon} className="w-4" alt="" /> {post.date}
          //     </p>
          //     <p className="">
          //       {post?.status === "Recovered" ? (
          //         <p className="flex gap-2">
          //           <CheckCircle className="w-4"></CheckCircle>Recovered
          //         </p>
          //       ) : (
          //         <p className="flex gap-2 items-center">
          //           <IoMdClose className="w-4 text-red-700" />
          //           Not - Recovered
          //         </p>
          //       )}
          //     </p>
          //     <div className="card-actions justify-end">
          //       <Link to={`/items/${post._id}`}>
          //         <button className=" border border-black rounded-[4px] px-4 py-2 btn text-black m-2">
          //           View Details
          //         </button>
          //       </Link>
          //     </div>
          //   </div>
          // </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4 transition-all hover:shadow-xl border border-gray-200">
            {/* Thumbnail Image */}
            <img
              src={post.thumbnail}
              className="h-40 w-full object-cover rounded-lg"
              alt={post.title}
            />

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mt-2">
              {post.title}
            </h3>

            {/* Lost or Found Status */}
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

            {/* Location */}
            <p className="flex items-center text-sm text-gray-600 mt-1">
              <FaMapMarkerAlt className="mr-1 text-gray-500" /> {post.location}
            </p>

            {/* Date */}
            <p className="flex items-center text-sm text-gray-600 mt-1">
              <FaCalendarAlt className="mr-1 text-gray-500" /> {post.date}
            </p>

            {/* Status (Recovered or Not) */}
            <p
              className={`text-sm font-medium mt-1 ${
                post.status === "Recovered" ? "text-green-600" : "text-red-600"
              }`}
            >
              {post.status}
            </p>

            {/* View Details Button */}
            <Link to={`/items/${post._id}`}>
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLostAndFoundItems;
