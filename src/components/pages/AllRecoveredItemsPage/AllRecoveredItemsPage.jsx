import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoLocationSharp } from "react-icons/io5";

const AllRecoveredItemsPage = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`/allRecovered/${user?.email}`)
      .then((res) => setItems(res.data));
  }, [user?.email]);
  return (
    <div>
      <h1 className="text-4xl text-center font-bold">All Revovered Item</h1>
      <div className="w-11/12 mx-auto">
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
                          <IoLocationSharp></IoLocationSharp>{item.recoveredLocation}
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
      </div>
    </div>
  );
};

export default AllRecoveredItemsPage;
