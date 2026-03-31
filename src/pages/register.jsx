import React, { useState } from "react";
import MyTextbox from "../components/textbox";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleRegister = async () => {
    const data = {
      email: email,
      name: name,
      gender: gender,
      phone: phone,
      password: password,
    };

    setLoading(true);
    try {
      await axios
        .post(`${import.meta.env.VITE_BASE_URL}auth/register`, data)
        .then((res) => {
          if (res.data.status === "success") {
            setLoading(false);
            toast.success(res.data.message || res.data.msg);
            return navigate("/");
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


  return (
    <div className="w-[100vw] h-[100vh] bg-purple-500 flex justify-center items-center">
      <ToastContainer />
      <form
        action="post"
        className="flex flex-col gap-[20px] sm:w-full rounded-sm h-fit p-[30px] justify-center items-center overflow-auto"
      >
        <MyTextbox
          type="email"
          label="Email"
          width="sm:w-[35vw] w-[80vw]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <MyTextbox
          label="Full Name"
          width="sm:w-[35vw] w-[80vw]"
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <div className="font-bold">Gender</div>
          <select
            className="sm:w-[35vw] w-[80vw] h-[40px] rounded-[4px] bg-[#f8f5f0]"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <MyTextbox
          label="Phone"
          type="number"
          width="sm:w-[35vw] w-[80vw]"
          onChange={(e) => setPhone(e.target.value)}
        />
        <div>
          <div className="font-bold">Password</div>
          <div className="relative">
            <input
              type={passwordType}
              className={`bg-[#f8f5f0] placeholder-black sm:w-[35vw] w-[80vw] h-[40px] px-2 rounded-[4px]`}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordType === "password" ? (
              <HiEye
                className="absolute text-black right-[10px] top-[12px] bottom-[10px]"
                onClick={togglePassword}
              />
            ) : (
              <HiEyeOff
                className="absolute text-black right-[10px] top-[15px] bottom-[10px]"
                onClick={togglePassword}
              />
            )}
          </div>
        </div>
        
        <Link to="/" className="text-[#ffda73] font-bold">
          Go back to Login?
        </Link>
        <button
          onClick={handleRegister}
          className="hover:bg-[#ffda73aa] hover:text-black bg-[#ffda73] text-white font-bold py-[20px] px-[30px] uppercase w-fit rounded-[7px]"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
