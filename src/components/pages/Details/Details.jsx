import React, { useContext, useEffect, useState } from "react";
import { data, useLoaderData } from "react-router-dom";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../context/AuthProvider";


const Details = () => {
  const {user}= useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
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
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleSubmit = (e)=>{
    e.preventDefault();
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
            </div>
            <div className="flex justify-end items-center">
              {postType === "Lost" ? (
                <div className="flex items-center justify-center bg-gray-100">
                  <button onClick={openModal} className="btn btn-neutral">
                    Found This !
                  </button>

                  <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    ariaHideApp={false}
                    className="bg-white w-96 p-6 rounded-lg shadow-lg mx-auto relative"
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Modal Title
                    </h2>
                    <p className="text-gray-600 mb-6">
                      This is a React Modal styled with Tailwind CSS.
                    </p>
                    <div className="flex justify-end">
                      <button
                        onClick={closeModal}
                        className="btn btn-info btn-outline"
                      >
                        Submit
                      </button>
                    </div>
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
                    className="bg-white w-1/2 p-6 rounded-lg shadow-lg mx-auto relative"
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
                        <span className="label-text">Recovered Person Email</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        placeholder=""
                        value={user?.email}
                        className="input input-bordered"
                        required
                      />
                    </div>
                    {/* recovered name */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Recovered Person Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder=""
                        value={user?.displayName}
                        className="input input-bordered"
                        required
                      />
                    </div>
                    {/* recovered photo */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Recovered Person Photo</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        placeholder=""
                        value={user?.photoURL}
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className="flex justify-center mt-3">
                      <button
                        onClick={closeModal}
                        className="btn btn-info btn-outline"
                      >
                        Submit
                      </button>
                    </div>
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
