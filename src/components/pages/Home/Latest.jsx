import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Latest = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("https://ph-assignment-11-server-murex.vercel.app/latestPost")
      .then((res) => setPosts(res.data));
  }, []);
  return (
    <div className=" pt-7 pb-7 bg-base-200">
      <h1 className="text-center text-4xl font-bold mb-2">
        Latest Lost & Found Post{" "}
      </h1>
      <div className="w-11/12 mx-auto grid md:grid-cols-3 gap-3">
      {posts.map((post) => (
        <div key={post._id} className="card  w-full shadow-lg">
          <figure>
            <img
              src={post.thumbnail}
              className="w-full h-[200px]"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{post.title}</h2>
            <p>Type : {post.postType}</p>
            <p>Location : {post.location}</p>
            <p>Date : {post.date}</p>
            <div className="card-actions justify-end">
              <Link to={`/items/${post._id}`}>
                <button className="btn btn-neutral">View Details</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      </div>
      <p className="flex justify-center items-center mt-3">
      <Link to="/allItems" className="btn btn-outline">
      See all
      </Link>
      </p>
    </div>
  );
};

export default Latest;
