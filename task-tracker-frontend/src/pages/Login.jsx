import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setErrorMsg(data.message || "Google login failed");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    }
  };

  const handleGoogleFailure = () => {
    setErrorMsg("Google login failed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isRegister) {
      // Login logic
      if (email && password) {
        try {
          const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();

          if (response.ok && data.token) {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          } else {
            setErrorMsg(data.message || "Login failed");
          }
        } catch (err) {
          setErrorMsg("Network error. Please try again.");
        }
      } else {
        setTimeout(() => {
          setErrorMsg("Please enter email and password");
        }, 100);
      }
    } else {
      // Register logic
      if (username && email && password) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, email, password }),
            }
          );
          const data = await response.json();

          if (response.ok && data.token) {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          } else {
            setErrorMsg(data.message || "Registration failed");
          }
        } catch (err) {
          setErrorMsg("Network error. Please try again.");
        }
      } else {
        setTimeout(() => {
          setErrorMsg("Please enter username, email and password");
        }, 100);
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId} locale="en">
      <div
        className="flex flex-col justify-between min-h-screen bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/7c/64/64/7c6464f6711d958c13edfaacde12b775.jpg')",
        }}
      >
        <h1 className="mt-6 text-4xl font-bold text-center text-white">
          Task Tracker
        </h1>

        <div className="flex flex-1 justify-center items-center px-4 backdrop-blur-sm">
          <div className="p-10 w-full max-w-md bg-white bg-opacity-90 rounded-xl shadow-xl">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isRegister && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    className="px-4 py-2 w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="px-4 py-2 w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="px-4 py-2 w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={
                    isRegister ? "Create a password" : "Enter your password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {errorMsg && (
                <div className="text-sm text-center text-red-600">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="py-2 mt-2 w-full text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded hover:opacity-90"
              >
                {isRegister ? "Register" : "Login"}
              </button>
            </form>

            {/* OR Separator */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300 border-solid border-[1px]" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300 border-solid border-[1px]" />
            </div>

            {/* Google Sign-In Button */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </div>

            <p className="mt-4 text-sm text-center text-gray-600">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsRegister(false)}
                    className="text-purple-600 hover:underline"
                    type="button"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setIsRegister(true)}
                    className="text-purple-600 hover:underline"
                    type="button"
                  >
                    Register
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="bg-white bg-opacity-70">
          <Footer />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
