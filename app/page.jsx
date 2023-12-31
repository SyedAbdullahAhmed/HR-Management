"use client"
import React, { useState } from "react"
import { useRouter } from 'next/navigation'

const Home = () => {

  const router = useRouter()
  const [loginForm,setLoginForm] = useState({}) 

  const handleInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  }
    const handleLoginSubmit = async(e) => {
    e.preventDefault()

    const url = "http://localhost:8000/admin";
        try {
            const response = await fetch(url);

            if (response.ok) {
                // console.log(loginForm)
                // console.log(response.body);
                console.log('data fecthec')

                
            } else {
                console.error("Request Failed.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
  }
  return (

    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md border-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">LOGIN</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              name="email"
              value={loginForm?.email || ""}
              onChange={handleInput}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              name="password"
              value={loginForm?.password || ""}
              onChange={handleInput}
            />
          </div>
          <button
            type="submit"
            className=" w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleLoginSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home;