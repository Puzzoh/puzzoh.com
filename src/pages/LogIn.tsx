import React, { useState, useContext } from "react";
import { AuthContext } from "context/authContext";
import Axios from "axios";
const GoogleIcon = require("assets/images/Google.png");
const LoginRight = require("assets/images/Image1.jpeg");

export default function LogIn() {

  const { login } = useContext(AuthContext)

  const [logInputs, setLogInputs] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setLogInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBoolChange = (e: React.ChangeEvent<any>) => {
    setLogInputs((prev) => ({ ...prev, rememberMe: !logInputs.rememberMe }));
  };

  const handleLogin = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    try {
      await login(logInputs);
      window.location.href = "/business/app"
    } catch (err: any) {
      alert(err.response.data)
    }
  };

  return (
    <div className="login-container">
      <div className="p-12 xl:flex xl:flex-col xl:justify-center xl:pl-16 bg-white">
        <div className="mb-12">
          <h1 className="text-4xl"> Welcome vendors </h1>
          <p className="opacity-70">
            Please log in to the portal to manage your vouchers
          </p>
        </div>
        <form className="w-full xl:w-24rem" onSubmit={handleLogin}>
          <div className="flex flex-col gap-4">
            <div className="mb-3">
              <label
                htmlFor="email"
                className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
              >
                Enter email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="border border-solid border-black h-14 px-8 py-0 w-full text-lg rounded-full"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="inline-block bg-white mb-2.5 absolute px-0 py-2.5 text-sm translate-x-7 -translate-y-5"
              >
                Enter password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border border-solid border-black h-14 px-8 py-0 w-full text-lg rounded-full"
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  className="checkbox w-5 h-5 accent-primary"
                  onChange={handleBoolChange}
                />
                <label htmlFor="rememberMeCheckbox" className="checkboxLabel">
                 Remember me
                </label>
              </div>
            </div>
            <button
              className="border-none bg-black text-white p-4 rounded-full text-center uppercase text-lg h-14 cursor-pointer hover:bg-gray-500"
              type="submit"
            >
              Sign In
            </button>
            <div className="text-center">
              Don&apos;t have an account? {""}
              <a href="/business/app/register" className="text-primary hover:font-bold">
                Sign Up
              </a>
            </div>
          </div>

          <div className="divider my-8 opacity-50">OR</div>
          <div className="gap-7">
            <a
              href="#"
              className="gap-4 border-solid border border-black rounded-full justify-center p-2.5 flex text-black hover:bg-third"
            >
              <img src={GoogleIcon} width="30" alt="google icon" />
              Google Login
            </a>
          </div>
        </form>
      </div>
      <div className="hidden md:bg-third md:flex md:justify-center">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" className="w-full" alt="background" />
      </div>
    </div>
  );
}
