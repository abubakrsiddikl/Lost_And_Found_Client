import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle } from "lucide-react";
import dateIcon from "../../../assets/schedule.png";
import locationIcon from "../../../assets/location.png";

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
          <div
            key={post._id}
            className="card bg-white w-full shadow-xl rounded-lg"
          >
            <figure>
              <img
                src={post.thumbnail}
                className="w-full h-[200px]"
                alt="Shoes"
              />
            </figure>
            <div className="pl-6">
              <h2 className="card-title">{post.title}</h2>
              <p className="flex items-center gap-2">
                <AlertTriangle className="w-4 " />
                {post.postType}
              </p>

              <p className="flex gap-2 items-center">
                <img src={locationIcon} alt="" className="w-4" />{" "}
                {post.location}
              </p>

              <p className="flex gap-2">
                <img src={dateIcon} className="w-4" alt="" /> {post.date}
              </p>
              <div className="card-actions justify-end">
                <Link to={`/items/${post._id}`}>
                  <button className=" border border-black rounded-[4px] px-4 py-2 btn text-black mr-4 mb-4">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="flex justify-center items-center mt-3">
        <Link to="/allItems" className="bg-blue-500 font-bold py-2 px-4 rounded-lg text-white shadow-xl mt-6">
          View more..
        </Link>
      </p>
    </div>
  );
};

export default Latest;
