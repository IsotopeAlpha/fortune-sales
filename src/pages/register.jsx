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
    <div className="min-h-screen min-w-screen bg-slate-900 flex items-center justify-center px-4 py-10">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(79,70,229,0.16),_transparent_35%)] pointer-events-none" />
        <div className="relative flex flex-col gap-8">
          <div className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-600">Create account</p>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Start your Gem journey</h1>
            <p className="mx-auto max-w-xl text-sm text-slate-600 sm:text-base">
              Register your account to unlock customer insights, manage leads, and grow your business with ease.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="flex flex-col gap-5"
          >
            <MyTextbox
              type="email"
              label="Email"
              width="sm:w-[35vw] w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            <MyTextbox
              label="Full Name"
              width="sm:w-[35vw] w-full"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-slate-800">Gender</span>
              <select
                className="w-full sm:w-[35vw] h-[44px] rounded-[12px] border border-slate-200 bg-slate-50 px-3 text-slate-900 transition duration-300 ease-in-out focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <MyTextbox
              label="Phone"
              type="number"
              width="sm:w-[35vw] w-full"
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-slate-800">Password</span>
              <div className="relative">
                <input
                  type={passwordType}
                  className="w-full sm:w-[35vw] h-[44px] rounded-[12px] border border-slate-200 bg-slate-50 px-3 text-slate-900 transition duration-300 ease-in-out focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordType === "password" ? (
                  <HiEye
                    className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-slate-500 transition duration-300 hover:text-slate-900"
                    onClick={togglePassword}
                  />
                ) : (
                  <HiEyeOff
                    className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-slate-500 transition duration-300 hover:text-slate-900"
                    onClick={togglePassword}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link to="/" className="text-purple-700 font-semibold transition duration-300 hover:text-purple-900">
                Go back to Login?
              </Link>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-[14px] bg-gradient-to-r from-slate-600 to-purple-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-lg shadow-purple-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
