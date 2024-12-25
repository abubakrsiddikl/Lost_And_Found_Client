import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { format, parse } from "date-fns";
import DatePicker from "react-datepicker";
import axios from "axios";
import toast from "react-hot-toast";

const UpdatePost = () => {
  const post = useLoaderData();
  // console.log(post);
  const [selectedDate, setSelectedDate] = useState(post?.date);

  const { user } = useContext(AuthContext);
  const {
    postType,
    category,
    description,
    email,
    name,
    location,
    thumbnail,
    title,
    date,
    _id,
  } = post;
  const handleUpdatePost = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    const date = selectedDate ? format(selectedDate, "dd MMM yyyy") : null;
    const {
      postType,
      category,
      description,
      email,
      name,
      location,
      thumbnail,
      title,
    } = initialData;
    const newItem = {
      postType,
      category,
      description,
      email,
      name,
      location,
      thumbnail,
      title,
      date,
    };
    // data post axios metod to database
    axios
      .put(`http://localhost:5000/updateItems/${_id}`, newItem)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Your Post Updated Success . ")
        }
      });
  };
  return (
    <div className="w-11/12 mx-auto">
      <div className="card w-full shrink-0">
        <form onSubmit={handleUpdatePost} className="card-body bg-base-200">
          <h1 className="text-center text-4xl font-bold">Update Your Post</h1>
          {/* row 1 */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Post Type</span>
              </label>
              <select
                defaultValue={postType}
                name="postType"
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  {" "}
                  Select Post Type
                </option>
                <option>Lost</option>
                <option>Found</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Thumbnail</span>
              </label>
              <input
                type="text"
                name="thumbnail"
                defaultValue={thumbnail}
                placeholder="Enter image url"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          {/* row 2 */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                defaultValue={title}
                placeholder="Enter Title"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                name="description"
                defaultValue={description}
                placeholder="Enter Description"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          {/* row 3 */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                defaultValue={category}
                name="category"
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  {" "}
                  Select Category
                </option>
                <option>Pets</option>
                <option>Documents</option>
                <option>Gadgets</option>
                <option>Others</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                defaultValue={location}
                placeholder="Enter Location where the item was lost or found"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          {/* row 4 */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Date Lost or Found</span>
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                className="input input-bordered w-full"
                icon="fa fa-calendar"
                placeholderText="Select Date Lost or Found"
                required
              ></DatePicker>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                value={user?.email}
                name="email"
                placeholder=""
                className="input input-bordered"
                required
              />
            </div>
          </div>
          {/* row 5 */}
          <div className="flex justify-start ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={user?.displayName}
                name="name"
                placeholder=""
                className="input input-bordered"
                required
              />
            </div>
          </div>
          {/* btn div */}
          <div className="form-control mt-6 flex justify-center items-center">
            <button type="submit" className="btn w-[180px] btn-neutral">
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
