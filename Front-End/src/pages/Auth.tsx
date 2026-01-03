import { useState } from "react";
import { login, register } from "../api/authService";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await login(form);
        localStorage.setItem("token", res.data.token);
        navigate('Dashboard');
      } else {
        await register(form);
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center text-white px-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center text-xl font-bold">
          ✓
        </div>
        <div>
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <p className="text-sm text-slate-400">
            Organize your work efficiently
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-6 shadow-lg">

        <h2 className="text-xl font-semibold text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="text-sm text-slate-400 text-center mt-1 mb-6">
          {isLogin
            ? "Enter your credentials to access your tasks"
            : "Sign up to start managing your tasks"}
        </p>

        <div className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-sky-500 hover:bg-sky-600 transition rounded-lg py-2 font-semibold"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </div>

        {/* Toggle */}
        <p className="text-sm text-slate-400 text-center mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-sky-500 cursor-pointer font-medium hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
