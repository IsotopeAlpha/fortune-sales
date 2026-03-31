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
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    setLoading(true);
    // eslint-disable-next-line no-useless-catch
    try {
      await axios
        .post(`${import.meta.env.VITE_BASE_URL}auth/login`, data)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));

          if (res.data.status === "error") {
            setLoading(false);
            toast.error(res.data.message);
          } else if (res.data.isAdmin === true) {
            setLoading(false);
            toast.success("Logged In Successfully");
            return navigate("/home");
          } else {
            setLoading(false);
            toast.error("You are not an admin");
          }
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-purple-500 flex justify-center items-center p-[20px]">
      <ToastContainer />
      <form
        action="post"
        className="flex flex-col gap-[20px] sm:w-fit  rounded-sm h-fit p-[30px] justify-center items-center"
      >
        <div className="bg-white flex flex-col gap-[10px] p-[30px]">
          <p className="w-full text-center font-bold uppercase">
            Please enter your admin details.
          </p>
          <MyTextbox
            label="Username"
            width="sm:w-[35vw]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <div className="font-bold">Password</div>
            <div className="relative">
              <input
                type={passwordType}
                className={`bg-[#f8f5f0] placeholder-black sm:w-[35vw] h-[40px] px-2 rounded-[4px]`}
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
        </div>

        <button
          disabled={loading}
          onClick={handleLogin}
          className="hover:bg-[#ffda73aa] hover:text-black bg-[#ffda73] text-purple-500 font-bold py-[20px] px-[30px] uppercase w-fit rounded-[7px]"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <Link to='/register' className='text-white font-bold'>Register an account?</Link>
      </form>
    </div>
  );
}
