import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import instance from "../helper";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [userSecurityCode, setUserSecurityCode] = useState("");
  const [staticSecurityCode, setStaticSecurityCode] = useState(Math.random().toString(36).substring(7));
//   console.log(captcha, ">>>>capg");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captcha) {
      Swal.fire({
        title: "Error",
        text: "Please complete the captcha",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (userSecurityCode !== staticSecurityCode) {
      Swal.fire({
        title: "Error",
        text: "Kode keamanan tidak cocok",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await instance.post("/login", {
        Username,
        Password,
        captchaValue: captcha,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Berhasil login",
          icon: "success",
          confirmButtonText: "OK",
        });
        localStorage.setItem("accessToken", response.data.accessToken);
        console.log(response.data);
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Form Login</h1>
      </div>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label htmlFor="Username" className="block text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              id="Username"
              name="Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Password" className="block text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="Password"
              id="Password"
              name="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="securityCode" className="block text-sm font-bold mb-2">
              Security Image:
            </label>
            <p className="mb-2 text-sm text-gray-600">{staticSecurityCode}</p>
            <input
              type="text"
              id="securityCode"
              name="securityCode"
              value={userSecurityCode}
              onChange={(e) => setUserSecurityCode(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <ReCAPTCHA
              sitekey="6Lc3eVgqAAAAAAXjigb4QaVIf7JdBD3VxJ7xU3YB"
              onChange={() => setCaptcha(true)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
