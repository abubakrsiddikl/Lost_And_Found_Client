import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoLocationSharp } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";

const AllRecoveredItemsPage = () => {
  const { user } = useContext(AuthContext);
  const [isTableLayout, setIsTableLayout] = useState(true);
  const [items, setItems] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`/allRecovered/${user?.email}`)
      .then((res) => setItems(res.data));
  }, [user?.email]);

  const handleToggleLayout = () => {
    setIsTableLayout((prevState) => !prevState);
  };

  return (
    <div className="bg-base-200 pt-5 pb-5">
      <h1 className="text-4xl text-center font-bold">All Revovered Item</h1>
      <div className="w-11/12 mx-auto ">
        <div className="flex justify-end">
          <button onClick={handleToggleLayout} className="text-2xl">
            {isTableLayout ? <FaAddressCard /> : <CiViewTable />}
          </button>
        </div>
        {!isTableLayout ? (
          // card format
          <div className="grid grid-cols-1 md:grid-cols-3">
            {items.map((item) => (
              <div key={item._id} className="  shadow-lg bg-white rounded-xl">
                <div className="flex justify-center">
                  <img
                    src={item.photo}
                    className="h-16 p-2 rounded-full"
                    alt=""
                  />
                </div>
                <div className="text-center">
                  <h1>Name : {item.name}</h1>
                  <p> Location : {item.recoveredLocation}</p>
                  <p>Recovered Date : {item.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // table formate
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
                  <th>Recovered Date</th>
                </tr>
              </thead>
              <tbody>
                {/* table row */}
                {items.map((item, idx) => (
                  <tr key={item._id}>
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
                            <img src={item.photo} alt="" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                          <div className="text-sm opacity-50 flex items-center">
                            <IoLocationSharp></IoLocationSharp>
                            {item.recoveredLocation}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRecoveredItemsPage;
