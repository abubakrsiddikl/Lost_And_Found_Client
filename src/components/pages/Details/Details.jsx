import React, { useContext, useEffect, useState } from "react";
import { data, useLoaderData, useParams } from "react-router-dom";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../context/AuthProvider";
import { format } from "date-fns";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaUser,
  FaTag,
  FaClipboardList,
} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import Chat from "../Chat/Chat";

const Details = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  useEffect(() => {
    try {
      axiosSecure.get(`/items/${id}`).then((res) => {
        setLoading(false)
        setPost(res.data);
      });
    } catch (error) {
      // console.log(error);
    }
  }, []);

  const {
    postType,
    category,
    status,
    name,
    description,
    email,
    location,
    thumbnail,
    title,
    date,
  } = post;

  if (loading) {
    return <p>Loading</p>
  }
  console.log(post)
  const openModal = () => {
    if (post.status === "Recovered") {
      return toast.error("This item allready recovred.");
    }
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    const date = selectedDate ? format(selectedDate, "dd MMM yyyy") : null;

    const newRecoveredItem = {
      ...initialData,
      id,
      date,
      status: "Recovered",
      title,
    };
    axios
      .post(
        "http://localhost:5000/allRecovered",
        newRecoveredItem
      )
      .then((res) => {
        if (res.data) {
          // console.log(res.data)
        }
      });
    // console.log(newRecoveredItem);
  };
  const handleUpdateStatus = () => {
    if (post.status === "Recovered") {
      return toast.error("This item allready recovred.");
    }
    const data = { status: "Recovered" };
    axios
      .patch(
        `http://localhost:5000/updateStatus/${id}`,
        data
      )
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          toast.success("Item has been recoverd");
          closeModal();
        }
      });
  };
  return (
    <div className="w-11/12 mx-auto my-3 bg-[#F3F4F6]">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row border">
        {/* image */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-4 ">
          <img
            src={thumbnail}
            alt={title}
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* content */}
        <div className="p-6 w-full md:w-1/2">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h1>
          <div className="text-lg text-gray-700 space-y-2">
            <p className="flex items-center gap-2">
              <FaClipboardList className="text-blue-500" />{" "}
              <span className="font-bold">Type:</span> {postType}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />{" "}
              <span className="font-bold">Location:</span> {location}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-green-500" />{" "}
              <span className="font-bold">Date:</span> {date}
            </p>
            <p>
              <span className="font-bold">Description:</span> {description}
            </p>
            <p className="flex items-center gap-2">
              <FaUser className="text-purple-500" />{" "}
              <span className="font-bold">Name:</span> {name}
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-500" />{" "}
              <span className="font-bold">Email:</span> {email}
            </p>
            <p className="flex items-center gap-2">
              <FaTag className="text-gray-600" />{" "}
              <span className="font-bold">Category:</span> {category}
            </p>
            <p
              className={`font-bold ${
                status === "Recovered" ? "text-green-500" : "text-red-500"
              }`}
            >
              Status: {status}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={openModal}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md transition-all"
            >
              {postType === "Lost" ? "Found This!" : "This is Mine!"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="bg-white w-full md:w-3/4 lg:w-1/2 max-w-2xl max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-xl mx-auto relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-semibold mb-4 text-center">
          Report Recovery
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recovered Location</span>
            </label>
            <input
              type="text"
              name="recoveredLocation"
              placeholder="Enter Recovered Location"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Date Lost or Found</span>
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="input input-bordered w-full"
              placeholderText="Select Date Lost or Found"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recovered Person Email</span>
            </label>
            <input
              type="text"
              name="email"
              readOnly
              value={user?.email}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recovered Person Name</span>
            </label>
            <input
              type="text"
              name="name"
              readOnly
              value={user?.displayName}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recovered Person Photo</span>
            </label>
            <input
              type="text"
              name="photo"
              readOnly
              value={user?.photoURL}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleUpdateStatus}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6 py-2 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
      <Chat userEmail={user?.email} recipientEmail={email}></Chat>
    </div>
  );
};

export default Details;

