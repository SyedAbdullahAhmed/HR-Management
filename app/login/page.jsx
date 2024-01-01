"use client"
import React, { useState } from "react"
import { useRouter } from 'next/navigation'

const Login = () => {

  const router = useRouter()
  const [loginForm, setLoginForm] = useState({})
  const [error, setError] = useState(false)

  // handle email and password
  const handleInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  }

  // handle submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:8000");
      const data = await response.json()

      if (data.response === 'true') {
        if(data.results[0].admin_username === loginForm.username && data.results[0].admin_password === loginForm.password)
        router.push('/home')
        else {
          setError(true)
          setTimeout(()=>{
            setError(false)
          },4000)
        }
        
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
          <h2 className="text-2xl font-semibold mb-6 text-center">ADMIN LOGIN</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
                name="username"
                value={loginForm?.username || ""}
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
            {error ? <div className="text-red-500 text-center">
              Incorrect Username or Password
            </div> : ""}
          </form>
        </div>
      </div>
    )
  }

  export default Login;