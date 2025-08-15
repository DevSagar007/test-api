"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [verifyNumber, setVerifyNumber] = useState("");
  const router = useRouter(); 

  const emailVerifyHandler = (e) => {
    e.preventDefault();

    if (!verifyNumber.trim()) {
      toast.error("Please enter the OTP code!");
      return;
    }

    setBtnLoading(true);
    sendOTP();
  };

  const sendOTP = async () => {
    const requestBody = { otp: verifyNumber };
    console.log(requestBody);

    try {
      const res = await axios.post(
        "https://moneychain.tdevs.co/api/auth/user/send-verify-email",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("OTP Verify Response:", res.data);
      toast.success("OTP verified successfully!");

      router.push("/dashboard"); 
    } catch (err) {
      console.error("OTP verify error:", err);
      toast.error(err.response?.data?.message || "OTP verification failed!");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-5">Email Verification</h1>
        <form onSubmit={emailVerifyHandler}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="otp"
            >
              Verify Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              onChange={(e) => setVerifyNumber(e.target.value)}
              value={verifyNumber}
            />
          </div>
          <div className="flex justify-center">
            <button
              disabled={btnLoading} // ✅ loading অবস্থায় disable করা হলো
              className={`${
                btnLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full`}
              type="submit"
            >
              {btnLoading ? "Sending..." : "Verify Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
