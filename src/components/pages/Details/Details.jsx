import React from "react";
import { data, useLoaderData } from "react-router-dom";

const Details = () => {
  const item = useLoaderData();
  const {
    postType,
    category,
    description,
    email,
    location,
    thumbnail,
    title,
    date,
  } = item;
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Image Section */}
          <img
            src={thumbnail}
            alt=""
            className="w-full h-64 md:h-[400px] object-cover"
          />

          {/* Content Section */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {title}
            </h1>
            <div className="text-gray-700">
              <p className="mb-3">
                <strong>Type:</strong> {postType}
              </p>
              <p className="mb-3">
                <strong>Location:</strong> {location}
              </p>
              <p className="mb-3">
                <strong>Date:</strong> {date}
              </p>
              <p className="mb-3">
                <strong>Description:</strong> {description}
              </p>
              <p className="mb-3">
                <strong>Email:</strong> {email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
