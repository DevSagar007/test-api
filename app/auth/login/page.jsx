"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Please enter a valid password");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const res = await axios.post(
        "https://moneychain.tdevs.co/api/auth/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login Response:", res.data);

      const token = res.data.data.token;
      localStorage.setItem("token", token);

      toast.success("Login Successful!");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      if (err.response?.status === 422) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-5">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <div className="mb-4 flex justify-between items-center">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="ml-2 text-gray-700">Remember Me</span>
              </label>
              <Link href="/forgot-password" className="text-blue-600">
                Forgot Password?
              </Link>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Login
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-700">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
