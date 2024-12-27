import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const AllLostAndFoundItems = () => {
  const items = useLoaderData();
  const [searchParams, setSearchParams] = useState("");
  const [posts, setPosts] = useState(items);
  // console.log(items);
  // console.log(searchParams);
  useEffect(() => {
    axios
      .get(`https://ph-assignment-11-server-murex.vercel.app/allItems?searchParams=${searchParams}`)
      .then((res) => setPosts(res.data));
  }, [searchParams]);
  return (
    <div>
      {/* search input */}
      <div className="w-1/2 mx-auto p-4 pb-7">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            onChange={(e) => setSearchParams(e.target.value)}
            className="grow"
            placeholder="Search Post"
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
          <div key={post._id} className="card  w-full shadow-xl">
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
              <p>Status : {post?.status}</p>
              <div className="card-actions justify-end">
                <Link to={`/items/${post._id}`}>
                  <button className="btn btn-neutral">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLostAndFoundItems;
