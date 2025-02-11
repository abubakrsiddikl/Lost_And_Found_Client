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
    name,
    description,
    email,
    location,
    thumbnail,
    title,
    date,
  } = post;
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
        "https://ph-assignment-11-server-murex.vercel.app/allRecovered",
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
        `https://ph-assignment-11-server-murex.vercel.app/updateStatus/${id}`,
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
    // <div className="bg-gray-100 min-h-screen py-10">
    //   <div className="container mx-auto max-w-4xl">
    //     <div className="bg-white shadow-lg rounded-lg overflow-hidden flex">
    //       {/* Image Section */}
    //       <div className="w-1/2">
    //         <img
    //           src={thumbnail}
    //           alt=""
    //           className=" h-64 md: object-cover"
    //         />
    //       </div>

    //       {/* Content Section */}
    //       <div className="p-8 w-1/2">
    //         <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
    //         <div className="text-gray-700">
    //           <p className="mb-3">
    //             <strong>Type:</strong> {postType}
    //           </p>
    //           <p className="mb-3">
    //             <strong>Location:</strong> {location}
    //           </p>
    //           <p className="mb-3">
    //             <strong>Date:</strong> {date}
    //           </p>
    //           <p className="mb-3">
    //             <strong>Description:</strong> {description}
    //           </p>
    //           <p className="mb-3">
    //             <strong>Name:</strong> {name}
    //           </p>
    //           <p className="mb-3">
    //             <strong>Email:</strong> {email}
    //           </p>
    //           <p className="mb-3">
    //             <strong>Category:</strong> {category}
    //           </p>
    //           <p className="mb-3">
    //             <strong>Status:</strong> {status}
    //           </p>
    //         </div>
    //         <div className="flex justify-end items-center">
    //           {postType === "Lost" ? (
    //             <div className="flex items-center justify-center bg-gray-100">
    //               <button onClick={openModal} className="btn btn-neutral">
    //                 Found This !
    //               </button>
    //               <Modal
    //                 isOpen={isOpen}
    //                 onRequestClose={closeModal}
    //                 ariaHideApp={false}
    //                 className="bg-white w-full md:w-3/4 lg:w-1/2 max-w-2xl max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg mx-auto relative"
    //                 overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    //               >
    //                 {/* Close Button */}
    //                 <button
    //                   onClick={closeModal}
    //                   className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
    //                 >
    //                   ✕
    //                 </button>

    //                 {/* Modal Content */}
    //                 <form onSubmit={handleSubmit}>
    //                   {/* recovered locaion */}
    //                   <div className="form-control w-full">
    //                     <label className="label">
    //                       <span className="label-text">Recovered location</span>
    //                     </label>
    //                     <input
    //                       type="text"
    //                       name="recoveredLocation"
    //                       placeholder="Enter Recovered Location"
    //                       className="input input-bordered"
    //                       required
    //                     />
    //                   </div>
    //                   {/* recoverde date */}
    //                   <div className="form-control w-full">
    //                     <label className="label">
    //                       <span className="label-text">Date Lost or Found</span>
    //                     </label>
    //                     <DatePicker
    //                       selected={selectedDate}
    //                       onChange={(date) => setSelectedDate(date)}
    //                       dateFormat="dd/MM/yyyy"
    //                       className="input input-bordered w-full"
    //                       icon="fa fa-calendar"
    //                       placeholderText="Select Date Lost or Found"
    //                       required
    //                     ></DatePicker>
    //                   </div>

    //                   {/* recovered email */}
    //                   <div className="form-control w-full">
    //                     <label className="label">
    //                       <span className="label-text">
    //                         Recovered Person Email
    //                       </span>
    //                     </label>
    //                     <input
    //                       type="text"
    //                       name="email"
    //                       placeholder=""
    //                       readOnly
    //                       value={user?.email}
    //                       className="input input-bordered"
    //                       required
    //                     />
    //                   </div>
    //                   {/* recovered name */}
    //                   <div className="form-control w-full">
    //                     <label className="label">
    //                       <span className="label-text">
    //                         Recovered Person Name
    //                       </span>
    //                     </label>
    //                     <input
    //                       type="text"
    //                       name="name"
    //                       placeholder=""
    //                       readOnly
    //                       value={user?.displayName}
    //                       className="input input-bordered"
    //                       required
    //                     />
    //                   </div>
    //                   {/* recovered photo */}
    //                   <div className="form-control w-full">
    //                     <label className="label">
    //                       <span className="label-text">
    //                         Recovered Person Photo
    //                       </span>
    //                     </label>
    //                     <input
    //                       type="text"
    //                       name="photo"
    //                       placeholder=""
    //                       readOnly
    //                       value={user?.photoURL}
    //                       className="input input-bordered"
    //                       required
    //                     />
    //                   </div>
    //                   <div className="flex justify-center mt-3">
    //                     <button
    //                       onClick={handleUpdateStatus}
    //                       className="btn btn-info btn-outline"
    //                     >
    //                       Submit
    //                     </button>
    //                   </div>
    //                 </form>
    //               </Modal>
    //             </div>
    //           ) : (
    //             <div className="flex items-center justify-center bg-gray-100">
    //               <button onClick={openModal} className="btn btn-neutral">
    //                 This is Mine !
    //               </button>

    //               <Modal
    //                 isOpen={isOpen}
    //                 onRequestClose={closeModal}
    //                 ariaHideApp={false}
    //                 className="bg-white w-full md:w-3/4 lg:w-1/2 max-w-2xl max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg mx-auto relative"
    //                 overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    //               >
    //                 {/* Close Button */}
    //                 <button
    //                   onClick={closeModal}
    //                   className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
    //                 >
    //                   ✕
    //                 </button>

    //                 {/* Modal Content */}
    //                 <form onSubmit={handleSubmit}>
    //                   {/* recovered locaion */}
    //                   <div className="form-control w-full">
    //                     <label className="label">
    //                       <span className="label-text">Recovered location</span>
    //                     </label>
    //                     <input
    //                       type="text"
    //                       name="recoveredLocation"
    //                       placeholder="Enter Recovered Location"
    //                       className="input input-bordered"
    //                       required
    //                     />
    //                   </div>
    //                   {/* recoverde date */}
    //                   <div className="form-control w-full">
    //                     <label className="label">
    //                       <span className="label-text">Date Lost or Found</span>
    //                     </label>
    //                     <DatePicker
    //                       selected={selectedDate}
    //                       onChange={(date) => setSelectedDate(date)}
    //                       dateFormat="dd/MM/yyyy"
    //                       className="input input-bordered w-full"
    //                       icon="fa fa-calendar"
    //                       placeholderText="Select Date Lost or Found"
    //                       required
    //                     ></DatePicker>
    //                   </div>

    //                   {/* recovered email */}
    //                   <div className="form-control w-full">
    //                     <label className="label">
    //                       <span className="label-text">
    //                         Recovered Person Email
    //                       </span>
    //                     </label>
    //                     <input
    //                       type="text"
    //                       name="email"
    //                       placeholder=""
    //                       readOnly
    //                       value={user?.email}
    //                       className="input input-bordered"
    //                       required
    //                     />
    //                   </div>
    //                   {/* recovered name */}
    //                   <div className="form-control w-full">
    //                     <label className="label">
    //                       <span className="label-text">
    //                         Recovered Person Name
    //                       </span>
    //                     </label>
    //                     <input
    //                       type="text"
    //                       name="name"
    //                       placeholder=""
    //                       readOnly
    //                       value={user?.displayName}
    //                       className="input input-bordered"
    //                       required
    //                     />
    //                   </div>
    //                   {/* recovered photo */}
    //                   <div className="form-control w-full">
    //                     <label className="label">
    //                       <span className="label-text">
    //                         Recovered Person Photo
    //                       </span>
    //                     </label>
    //                     <input
    //                       type="text"
    //                       name="photo"
    //                       placeholder=""
    //                       readOnly
    //                       value={user?.photoURL}
    //                       className="input input-bordered"
    //                       required
    //                     />
    //                   </div>
    //                   <div className="flex justify-center mt-3">
    //                     <button
    //                       onClick={handleUpdateStatus}
    //                       className="btn btn-info btn-outline"
    //                     >
    //                       Submit
    //                     </button>
    //                   </div>
    //                 </form>
    //               </Modal>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-gray-50 min-h-screen py-10">
    <div className="w-11/12 mx-auto ">
      <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row ">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <img
            src={thumbnail}
            alt=""
            className=" w-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 w-full md:w-1/2">
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h1>
          <div className="text-lg text-gray-600">
            <p className="mb-1">
              <span className="font-bold ">Type:</span> {postType}
            </p>
            <p className="mb-1">
              <span className="font-bold">Location:</span> {location}
            </p>
            <p className="mb-1">
              <span className="font-bold">Date:</span> {date}
            </p>
            <p className="mb-1">
              <span className="font-bold">Description:</span> {description}
            </p>
            <p className="mb-1">
              <span className="font-bold">Name:</span> {name}
            </p>
            <p className="mb-1">
              <span className="font-bold">Email:</span> {email}
            </p>
            <p className="mb-1">
              <span className="font-bold">Category:</span> {category}
            </p>
            <p className="mb-1">
              <span className="font-bold">Status:</span> {status}
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={openModal}
              className="border border-black py-2 px-4 rounded-[4px] "
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
              className="btn bg-blue-500 hover:bg-blue-600 text-white btn-outline rounded-md px-6 py-2 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  </div>
  );
};

export default Details;

// import React, { useState } from "react";
// import Modal from "react-modal";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const LostFoundCard = ({
//   thumbnail,
//   title,
//   postType,
//   location,
//   date,
//   description,
//   name,
//   email,
//   category,
//   status,
//   user,
//   openModal,
//   closeModal,
//   isOpen,
//   handleSubmit,
//   handleUpdateStatus,
//   setSelectedDate,
//   selectedDate,
// }) => {
//   return (
//     <div className="bg-gray-50 min-h-screen py-10">
//       <div className="container mx-auto max-w-4xl">
//         <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row">
//           {/* Image Section */}
//           <div className="w-full md:w-1/2">
//             <img
//               src={thumbnail}
//               alt=""
//               className="h-64 w-full object-cover"
//             />
//           </div>

//           {/* Content Section */}
//           <div className="p-6 w-full md:w-1/2">
//             <h1 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h1>
//             <div className="text-sm text-gray-600">
//               <p className="mb-1">
//                 <span className="font-medium">Type:</span> {postType}
//               </p>
//               <p className="mb-1">
//                 <span className="font-medium">Location:</span> {location}
//               </p>
//               <p className="mb-1">
//                 <span className="font-medium">Date:</span> {date}
//               </p>
//               <p className="mb-1">
//                 <span className="font-medium">Description:</span> {description}
//               </p>
//               <p className="mb-1">
//                 <span className="font-medium">Name:</span> {name}
//               </p>
//               <p className="mb-1">
//                 <span className="font-medium">Email:</span> {email}
//               </p>
//               <p className="mb-1">
//                 <span className="font-medium">Category:</span> {category}
//               </p>
//               <p className="mb-1">
//                 <span className="font-medium">Status:</span> {status}
//               </p>
//             </div>
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={openModal}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all"
//               >
//                 {postType === "Lost" ? "Found This!" : "This is Mine!"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Modal */}
//         <Modal
//           isOpen={isOpen}
//           onRequestClose={closeModal}
//           ariaHideApp={false}
//           className="bg-white w-full md:w-3/4 lg:w-1/2 max-w-2xl max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg mx-auto relative"
//           overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//         >
//           {/* Close Button */}
//           <button
//             onClick={closeModal}
//             className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           >
//             ✕
//           </button>

//           {/* Modal Content */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="form-control w-full">
//               <label className="label">
//                 <span className="label-text">Recovered Location</span>
//               </label>
//               <input
//                 type="text"
//                 name="recoveredLocation"
//                 placeholder="Enter Recovered Location"
//                 className="input input-bordered w-full"
//                 required
//               />
//             </div>

//             <div className="form-control w-full">
//               <label className="label">
//                 <span className="label-text">Date Lost or Found</span>
//               </label>
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => setSelectedDate(date)}
//                 dateFormat="dd/MM/yyyy"
//                 className="input input-bordered w-full"
//                 placeholderText="Select Date Lost or Found"
//                 required
//               />
//             </div>

//             <div className="form-control w-full">
//               <label className="label">
//                 <span className="label-text">Recovered Person Email</span>
//               </label>
//               <input
//                 type="text"
//                 name="email"
//                 readOnly
//                 value={user?.email}
//                 className="input input-bordered w-full"
//                 required
//               />
//             </div>

//             <div className="form-control w-full">
//               <label className="label">
//                 <span className="label-text">Recovered Person Name</span>
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 readOnly
//                 value={user?.displayName}
//                 className="input input-bordered w-full"
//                 required
//               />
//             </div>

//             <div className="form-control w-full">
//               <label className="label">
//                 <span className="label-text">Recovered Person Photo</span>
//               </label>
//               <input
//                 type="text"
//                 name="photo"
//                 readOnly
//                 value={user?.photoURL}
//                 className="input input-bordered w-full"
//                 required
//               />
//             </div>

//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={handleUpdateStatus}
//                 className="btn bg-blue-500 hover:bg-blue-600 text-white btn-outline rounded-md px-6 py-2 transition-all"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default LostFoundCard;
