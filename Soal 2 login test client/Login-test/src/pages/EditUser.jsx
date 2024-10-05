import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../helper";
import Swal from "sweetalert2";

export default function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  console.log(user,"user>>>>");

  const fetchData = async () => {
    try {
        const response = await instance.get(`/list/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        console.log(response,"response>>>>");
      setUser(response.data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.put(`/list/${id}`, {
        Username: e.target.Username.value,
        Password: e.target.Password.value,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      Swal.fire({
        title: "Berhasil!",
        text: "User berhasil diubah",
        icon: "success",
        confirmButtonText: "OK"
      })    ;
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="Username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            name="Username"
            id="Username"
            defaultValue={user?.user.Username}
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="Password"
            name="Password"
            id="Password"
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
