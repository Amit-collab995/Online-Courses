
import React from "react";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import axios from "axios";

const getCurrentUser = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userData) {
      const fetchUser = async () => {
        try {
          const result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
            withCredentials: true,
          });
          dispatch(setUserData(result.data));
        } catch (error) {
          console.log(error);
          dispatch(setUserData(null));
        }
      };
      fetchUser();
    }
  }, [dispatch, userData]);
};

export default getCurrentUser;
