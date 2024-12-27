import React, { useContext, useEffect, useState } from "react";
import { data, useLoaderData, useParams } from "react-router-dom";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../context/AuthProvider";
import { format } from "date-fns";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
import { da } from "date-fns/locale";

const Details = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  useEffect(() => {
    try {
      axiosSecure.get(`/items/${id}`).then((res) => {
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
    description,
    email,
    location,
    thumbnail,
    title,
    date,
  } = post;
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    const date = selectedDate ? format(selectedDate, "dd MMM yyyy") : null;

    const newRecoveredItem = { ...initialData, id, date, status: "Recovered" };
    axios
      .post("http://localhost:5000/allRecovered", newRecoveredItem)
      .then((res) => {
        if (res.data) {
          // console.log(res.data)
        }
      });
    // console.log(newRecoveredItem);
  };
  const handleUpdateStatus = () => {
    const data = { status: "Recovered" };
    axios
      .patch(`http://localhost:5000/updateStatus/${id}`, data)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          toast.success("Item has been recoverd");
        }
      });
  };
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
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
              <p className="mb-3">
                <strong>Status:</strong> {status}
              </p>
            </div>
            <div className="flex justify-end items-center">
              
              {postType === "Lost" ? (
                <div className="flex items-center justify-center bg-gray-100">
                  <button onClick={openModal} className="btn btn-neutral">
                    This is Mine !
                  </button>
                  <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    ariaHideApp={false}
                    className="bg-white w-full md:w-3/4 lg:w-1/2 max-w-2xl max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg mx-auto relative"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                  >
                    {/* Close Button */}
                    <button
                      onClick={closeModal}
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>

                    {/* Modal Content */}
                    <form onSubmit={handleSubmit}>
                      {/* recovered locaion */}
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Recovered location</span>
                        </label>
                        <input
                          type="text"
                          name="recoveredLocation"
                          placeholder="Enter Recovered Location"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      {/* recoverde date */}
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

                      {/* recovered email */}
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">
                            Recovered Person Email
                          </span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          placeholder=""
                          readOnly
                          value={user?.email}
                          className="input input-bordered"
                          required
                        />
                      </div>
                      {/* recovered name */}
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">
                            Recovered Person Name
                          </span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder=""
                          readOnly
                          value={user?.displayName}
                          className="input input-bordered"
                          required
                        />
                      </div>
                      {/* recovered photo */}
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">
                            Recovered Person Photo
                          </span>
                        </label>
                        <input
                          type="text"
                          name="photo"
                          placeholder=""
                          readOnly
                          value={user?.photoURL}
                          className="input input-bordered"
                          required
                        />
                      </div>
                      <div className="flex justify-center mt-3">
                        <button
                          onClick={handleUpdateStatus}
                          className="btn btn-info btn-outline"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </Modal>
                </div>
              ) : (
                <div className="flex items-center justify-center bg-gray-100">
                  <button onClick={openModal} className="btn btn-neutral">
                    This is Mine !
                  </button>

                  <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    ariaHideApp={false}
                    className="bg-white w-full md:w-3/4 lg:w-1/2 max-w-2xl max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg mx-auto relative"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                  >
                    {/* Close Button */}
                    <button
                      onClick={closeModal}
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>

                    {/* Modal Content */}
                    <form onSubmit={handleSubmit}>
                      {/* recovered locaion */}
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Recovered location</span>
                        </label>
                        <input
                          type="text"
                          name="recoveredLocation"
                          placeholder="Enter Recovered Location"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      {/* recoverde date */}
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

                      {/* recovered email */}
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">
                            Recovered Person Email
                          </span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          placeholder=""
                          readOnly
                          value={user?.email}
                          className="input input-bordered"
                          required
                        />
                      </div>
                      {/* recovered name */}
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">
                            Recovered Person Name
                          </span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder=""
                          readOnly
                          value={user?.displayName}
                          className="input input-bordered"
                          required
                        />
                      </div>
                      {/* recovered photo */}
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">
                            Recovered Person Photo
                          </span>
                        </label>
                        <input
                          type="text"
                          name="photo"
                          placeholder=""
                          readOnly
                          value={user?.photoURL}
                          className="input input-bordered"
                          required
                        />
                      </div>
                      <div className="flex justify-center mt-3">
                        <button
                          onClick={handleUpdateStatus}
                          className="btn btn-info btn-outline"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </Modal>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
