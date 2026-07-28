import React, { useState } from "react";
import MyTextbox from "../components/textbox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";

export default function Profile() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser)?.data : null;
  console.log("User data:", user);
  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [location, setLocation] = useState(user?.location || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = { email, name, gender, phone, location };

    setLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}users/${user?._id}`,
        data,
      );

      if (res.data.status === "success") {
        toast.success(res.data.message || res.data.msg || "Profile updated successfully");
        
      } else {
        toast.error(
          "Error updating profile. Check your parameters and try again.",
        );
      }
    } catch (error) {
      toast.error(
        "Error updating profile. Check your parameters and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-purple-500 flex flex-col justify-center items-center text-white px-4">
        <div className="animate-pulse text-6xl">⏳</div>
        <p className="mt-6 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-screen bg-slate-900 flex items-center justify-center p-6">
      <ToastContainer />
      <div className="h-full w-3xl sm:w-full bg-white/95 backdrop-blur-xl border border-white/30 rounded-[32px] shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-purple-600 px-8 py-6">
          <div>
            <h1 className="text-3xl sm:text-lg font-semibold text-white">
              Edit Profile
            </h1>
            <p className="mt-2 text-sm text-purple-100 max-w-2xl">
              Update your profile details and save changes. Use the back button
              to return to the previous page.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/home")}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-red-600"
          >
            <AiFillCloseCircle className="text-lg" />
            Close
          </button>
        </div>

        <form onSubmit={handleUpdate} className="grid gap-5 p-8">
          <MyTextbox
            type="email"
            label="Email"
            value={email}
            defaultValue={user?.email}
            width="w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
          <MyTextbox
            label="Full Name"
            value={name}
            defaultValue={user?.name}
            width="w-full"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="grid gap-2">
            <label className="font-semibold text-purple-900">Gender</label>
            <select
              className="w-full h-[44px] rounded-2xl border border-purple-200 bg-[#f8f5f0] px-4 text-sm text-purple-900 outline-none transition focus:border-purple-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          <MyTextbox
            label="Phone"
            type="number"
            value={phone}
            defaultValue={user?.phone}
            width="w-full"
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            type="submit"
            className="mx-auto mt-4 rounded-2xl bg-white px-10 py-4 text-base font-semibold text-black shadow-lg shadow-purple-500/20 transition hover:bg-purple-700"
          >
            {loading ? "Saving..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
