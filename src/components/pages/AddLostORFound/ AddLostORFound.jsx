import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../context/AuthProvider";
import { format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
const AddLostORFound = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { user } = useContext(AuthContext);
  const handleAddPost = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    const date = format(selectedDate, "dd MMM yyyy");
    const {
      postType,
      category,
      description,
      email,
      location,
      thumbnail,
      title,
    } = initialData;
    const newItem = {
      postType,
      category,
      description,
      email,
      location,
      thumbnail,
      title,
      date,
    };
    // data post axios metod to database
    axios.post("http://localhost:5000/addItems", newItem)
     .then((res) => {
      if (res.data) {
        toast.success("Your Post Added Auccessfully .");
        console.log(res);
      }
    });
    console.log(newItem);
  };
  return (
    <div className="w-11/12 mx-auto">
      <div className="card w-full shrink-0">
        <form onSubmit={handleAddPost} className="card-body bg-base-200">
          {/* row 1 */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Post Type</span>
              </label>
              <select name="postType" className="select select-bordered w-full">
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
              <select name="category" className="select select-bordered w-full">
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
                defaultValue={user?.email}
                name="email"
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

export default AddLostORFound;
