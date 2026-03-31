import React, { useState } from "react";
import MyTextbox from "../components/textbox";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgClose } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")).data;
  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);
  const [gender, setGender] = useState(user?.gender);
  const [phone, setPhone] = useState(user?.phone);
  const [location, setLocation] = useState(user?.location);
  const [loading, setLoading] = useState(false);

  console.log(user);
  const handleUpdate = async () => {
    const data = {
      email: email,
      name: name,
      gender: gender,
      phone: phone,
      location: location,
    };

    setLoading(true);
    try {
      await axios
        .put(`${import.meta.env.VITE_BASE_URL}users/${user?._id}`, data)
        .then((res) => {
          if (res.data.status === "success") {
            setLoading(false);
            toast.success(res.data.message || res.data.msg);
            return navigate("/home");
          } else {
            setLoading(false);
            toast.error(
              "Error Creating User, Check Your Parameters Well and Try Again!!",
            );
          }
        });
    } catch (error) {
      setLoading(false);
      toast.error(
        // eslint-disable-next-line no-constant-binary-expression
        "Error Creating User, Check Your Parameters Well and Try Again!!" ||
          error,
      );
    }
  };

  return user === null ? (
    <p className="w-[100vw] h-[100vh] bg-purple-500 flex flex-col justify-center items-center">
      <FaRegCircleDot
        className="text-white  animate-ping"
        size={80}
        thickness={4}
      />
      <p className="text-2xl mt-20 text-white">Loading...</p>
    </p>
  ) : (
    <div className="w-[100vw] h-[100vh] bg-purple-500 flex justify-center items-center">
      <ToastContainer />
      <form
        action="post"
        className="flex flex-col gap-[20px] sm:w-full rounded-sm h-fit p-[30px] justify-center items-center overflow-auto"
      >
        <p className="w-full flex flex-row justify-end">
          <AiFillCloseCircle
            color="red"
            size={30}
            className="cursor-pointer "
            onClick={navigate('/home')}
          />
        </p>
        <MyTextbox
          type="email"
          label="Email"
          defaultValue={user?.email}
          width="sm:w-[35vw] w-[80vw]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <MyTextbox
          label="Full Name"
          width="sm:w-[35vw] w-[80vw]"
          defaultValue={user?.name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <div className="font-bold">Gender</div>
          <select
            className="sm:w-[35vw] w-[80vw] h-[40px] rounded-[4px] bg-[#f8f5f0]"
            onChange={(e) => setGender(e.target.value)}
          >
            {user?.gender ? (
              <option value>{user?.gender}</option>
            ) : (
              <option>Select Gender</option>
            )}
            {user?.gender === "Female" ? (
              <option value="Male">Male</option>
            ) : (
              <option value="Female">Female</option>
            )}
          </select>
        </div>
        <MyTextbox
          label="Phone"
          type="number"
          defaultValue={user?.phone}
          width="sm:w-[35vw] w-[80vw]"
          onChange={(e) => setPhone(e.target.value)}
        />

        <MyTextbox
          label="Location"
          type="text"
          defaultValue={user?.location}
          width="sm:w-[35vw] w-[80vw]"
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          className="hover:bg-[#ffda73aa] hover:text-purple-700 bg-white text-purple-500 font-bold py-[20px] px-[30px] uppercase w-fit rounded-[7px]"
        >
          {loading ? "Loading..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
