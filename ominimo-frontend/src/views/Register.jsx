import React, { useState } from "react";
import { addCsrfToken, register } from "../axios";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleRegister = async () => {
    if (credentials.password !== credentials.password_confirmation) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await addCsrfToken();
      const resp = await register(credentials);
      sessionStorage.setItem("auth_token", resp.token);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
          Register
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={credentials.name}
            onChange={(e) =>
              setCredentials({ ...credentials, name: e.target.value })
            }
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password_confirmation"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="password_confirmation"
            value={credentials.password_confirmation}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                password_confirmation: e.target.value,
              })
            }
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
