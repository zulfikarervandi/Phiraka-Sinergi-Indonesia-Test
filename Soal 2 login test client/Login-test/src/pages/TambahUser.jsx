import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import instance from '../helper';


export default function TambahUser() {
    const navigate  = useNavigate();
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await instance.post("/register", { Username, Password });
            console.log(response);
            if (response.status === 201) {
                Swal.fire({
                    title: "Success",
                    text: "Berhasil menambahkan user",
                    icon: "success",
                    confirmButtonText: "OK"
                })
                navigate("/login");
            }
            
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
                confirmButtonText: "OK"
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 className="text-lg font-bold mb-4">Form penambahan User</h1>
            <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="Username" className="block text-sm font-bold mb-2">Nama:</label>
                    <input type="text" id="Username" name="Username" value={Username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label htmlFor="Password" className="block text-sm font-bold mb-2">Password:</label>
                    <input type="Password" id="Password" name="Password" value={Password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
        </div>
    )
}
