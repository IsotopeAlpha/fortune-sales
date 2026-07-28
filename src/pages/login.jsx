import { useState } from "react";
import MyTextbox from "../components/textbox";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiLogIn } from "react-icons/bi";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}auth/login`,
        data
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.status === "error") {
        toast.error(res.data.message);
      } else if (res.data.isAdmin === true) {
        toast.success("Logged in successfully");
        navigate("/home");
      } else {
        toast.error("You are not an admin");
      }
    } catch (error) {
      toast.error("Unable to login. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-slate-900/70 flex items-center justify-center p-6">
      <ToastContainer position="top-center" autoClose={2500} pauseOnHover={false} />
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes floatGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.18); }
          50% { box-shadow: 0 0 40px 12px rgba(255,255,255,0.16); }
        }
      `}</style>

      <form
        onSubmit={handleLogin}
        className="sm:w-[50vw] max-w-full rounded-[32px] border border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden"
        style={{ animation: "slideUp 0.75s ease-out forwards" }}
      >
        <div className="bg-slate-900 p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white drop-shadow-md">
                Welcome to Gem
              </h1>
              <p className="mt-2 text-sm text-white/85">
                Secure access to our products.
              </p>
            </div>
            <div className="rounded-full bg-white/15 p-3 text-white shadow-lg shadow-black/15">
              <BiLogIn className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="space-y-6 p-8">
          <MyTextbox
            label="Email"
            width="sm:w-[35vw]"
            value={email}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition duration-300 focus:border-fuchsia-500 focus:bg-white focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition duration-300 focus:border-fuchsia-500 focus:bg-white focus:outline-none"
              />
              {passwordType === "password" ? (
                <HiEye
                  className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-slate-500 transition duration-200 hover:text-fuchsia-600"
                  onClick={togglePassword}
                />
              ) : (
                <HiEyeOff
                  className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-slate-500 transition duration-200 hover:text-fuchsia-600"
                  onClick={togglePassword}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-gradient-to-r from-slate-600 to-purple-500 px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-pink-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
            style={{ animation: "floatGlow 3s ease-in-out infinite" }}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="text-center text-sm text-slate-600">
            <span>Need an account? </span>
            <Link
              to="/register"
              className="font-semibold text-fuchsia-600 transition duration-200 hover:text-fuchsia-700"
            >
              Register here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
