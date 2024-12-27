import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoLocationSharp } from "react-icons/io5";

const AllRecoveredItemsPage = () => {
  const { user } = useContext(AuthContext);
  const [isTableLayout, setIsTableLayout] = useState(false);
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
    <div>
      <h1 className="text-4xl text-center font-bold">All Revovered Item</h1>
      <div className="w-11/12 mx-auto">
        <h1 className="text-center text-4xl font-bold">My Post</h1>
        <button onClick={handleToggleLayout} className="btn btn-info">
          {isTableLayout ? "Switc card" : "Switch Table"}
        </button>
        {!isTableLayout ? (
          <div className="grid grid-cols-1 md:grid-cols-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-center items-center gap-2"
              >
                <div>
                  <img src={item.photo} className="h-16" alt="" />
                </div>
                <div>
                  <h1>Name : {item.name}</h1>
                  <p>Location : {item.recoveredLocation}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
