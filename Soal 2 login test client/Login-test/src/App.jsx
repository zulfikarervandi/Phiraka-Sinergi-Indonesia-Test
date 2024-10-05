import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import TambahUser from './pages/TambahUser';
import List from './pages/List';
import EditUser from './pages/EditUser';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <List />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/tambah-user",
      element: <TambahUser   />,
    },
    {
      path: "/edit-user/:id",
      element: <EditUser />,
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App
