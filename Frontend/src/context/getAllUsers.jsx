import React, { useEffect, useState } from "react";
import axios from "axios";

// 1. Rename function to start with 'use'
function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      
      // LocalStorage se Token nikalo
      const storedUser = JSON.parse(localStorage.getItem("ChatAppUser"));
      const token = storedUser?.token;

      // 2. SAFETY CHECK: Agar token nahi hai, to request mat bhejo
      if (!token) {
          console.log("No token found in LocalStorage");
          setLoading(false);
          return;
      }

      try {
        const res = await axios.get("http://localhost:5000/user/getUserProfile", {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

        setAllUsers(res.data);
      } catch (error) {
        console.log("Error in useGetAllUsers: ", error);
      } finally {
        setLoading(false); // Ye hamesha chalega, chahe error aaye ya success ho
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;