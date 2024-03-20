import React, { useState } from "react";
import axios from 'axios';
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/sellerSlice';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [data, setData] = useState({
    Seller_Email: "",
    Seller_Password: "",
  });
  const navigate = useNavigate();

  const [loginMessage, setLoginMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const response = await axios.post('http://localhost:8000/api/auth/signin', data);
      console.log(response);

      dispatch(signInSuccess(response.data));
      setLoginMessage("Sign-in successful!");
      navigate("/");
    } catch (error) {
      console.error('Login failed:', error);
      dispatch(signInFailure(error.message));
      setLoginMessage("Login failed. Please try again.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <div className="flex justify-center relative items-center h-[100vh]">
        <div>
          <div className="relative text-white">
            <h1 className=" text-4xl w-[100%] font-bold -mb-1   bg-[#100d14] text-center p-4 rounded-t-2xl">
              LOG IN
            </h1>
            <div className="h-full  w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 shadow-xl shadow-white
 p-12 rounded-b-3xl flex justify-center flex-col items-center max-w-[500px]">
              <form onSubmit={onSubmit} className="flex flex-col gap-10">
                <div className="">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email Address</label>
                    <input
                      className="w-[400px] border-[2px] text-black border-[#6c85a1] rounded-2xl text-l py-2 px-4 "
                      onChange={handleChange}
                      type="text"
                      value={data.Seller_Email}
                      id="Seller_Email"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Password</label>
                    <div className="flex justify-between relative">
                      <input
                        className="w-[400px] border-[2px] text-black border-[#6c85a1] rounded-2xl text-l py-2 px-4"
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        value={data.Seller_Password}
                        id="Seller_Password"
                      />
                      {showPassword ? (
                        <FaEye
                          className="absolute right-2 top-[30%]"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <IoMdEyeOff
                          className="absolute right-2 top-[30%]"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="p-2 pt-5">
                    <button
                      type="submit"
                      className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-3 rounded-lg w-full
                          border-blue-600
                          border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                          active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              {loginMessage && <p>{loginMessage}</p>}
            </div>
          </div>
          <div className="">
            <img src="/Images/collage.png" alt="" className="absolute left-0 -top-[350px] scale-[0.5] w-auto -z-[1]" />
          </div>
        </div>
        <img className="absolute left-0 bottom-0" src="/Images/men.png" alt="" />
        <img className="absolute right-0 bottom-0" src="/Images/girl.png" alt="" />
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Login;