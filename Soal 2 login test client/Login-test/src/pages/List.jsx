import React, { useEffect, useState } from "react";
import instance from "../helper";
import { Link } from "react-router-dom";

export default function List() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await instance.get("/list", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        console.log(response);
        setData(response.data);
    } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
          setLoading(false);
        }
    };
    
    const deleteUser = async (id) => {
        try {
            await instance.delete(`/list/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            // setData(data.filter((item) => item.id !== id));
            fetchData();
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div>
        <h2 className="justify-start text-2xl font-bold mb-4">Daftar User</h2>
        </div>
      <hr className="mb-4 border-t border-gray-300 w-full" />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ctime
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fungsi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.user.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.Username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Xxxx</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/edit-user/${item.id}`} className="mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</Link>
                  <button onClick={() => deleteUser(item.id)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
