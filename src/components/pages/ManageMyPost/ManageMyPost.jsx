import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageMyPost = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    // use custom axiosSecure hook
    axiosSecure
      .get(`/myItems/${user?.email}`)
      .then((res) => setPosts(res.data));
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://ph-assignment-11-server-murex.vercel.app/item/${id}`).then((res) => {
          if (res.data.deletedCount === 1) {
            const remaingPosts = posts.filter((post) => post._id !== id);
            setPosts(remaingPosts);
          }
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="w-11/12 mx-auto min-h-screen">
      <h1 className="text-center text-4xl font-bold">My Post</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* table row */}
            {posts.map((post, idx) => (
              <tr key={post._id}>
                <th>
                  {/* <label>
                    <input type="checkbox" className="checkbox" />
                  </label> */}
                  <p>{idx + 1}</p>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={post.thumbnail} alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{post.title}</div>
                      <div className="text-sm opacity-50">{post.location}</div>
                    </div>
                  </div>
                </td>
                <td>{post.category}</td>
                <td>{post.postType}</td>
                <td>{post.date}</td>
                <th>
                  <p className="flex  items-center gap-3">
                    <Link
                      to={`/updateItems/${post._id}`}
                      className="btn btn-neutral btn-sm"
                    >
                      update
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-2xl text-red-500 btn btn-sm"
                    >
                      <MdDelete></MdDelete>
                    </button>
                  </p>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMyPost;
