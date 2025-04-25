import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";


const AnyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch user info (token is sent automatically in the cookie)
    axiosSecure
      .get("/user")
      .then((response) => {
        setUserInfo(response.data.user); // Contains email and other decoded token data
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, [axiosSecure]);

  return (
    <div>
      <h2>User Info</h2>
      {userInfo ? (
        <p>Email: {userInfo.email}</p>
      ) : (
        <p>Loading or not logged in...</p>
      )}
    </div>
  );
};

export default AnyPage;
