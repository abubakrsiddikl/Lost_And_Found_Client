import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const AllLostAndFoundItems = () => {
  const items = useLoaderData();
  console.log(items);
  return (
    <div className="w-11/12 mx-auto grid md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item._id} className="card  w-full shadow-xl">
          <figure>
            <img
              src={item.thumbnail}
              className="w-full h-[200px]"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <p>Type : {item.postType}</p>
            <p>Location : {item.location}</p>
            <p>Date : {item.date}</p>
            <div className="card-actions justify-end">
              <Link to={`/items/${item._id}`}>
                <button className="btn btn-neutral">View Details</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllLostAndFoundItems;
