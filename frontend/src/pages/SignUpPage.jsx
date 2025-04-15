import { useRef, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const { signup } = useAuthStore();
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => [setShowPassword((prevState) => !prevState)];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    const formData = Object.fromEntries(data);

    await signup(formData);
    navigate("/")
    formRef.current.reset();
  };

  const formRef = useRef();

  return (
    <main>
      <div className="flex flex-col justify-center items-center h-screen bg-base-300">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-80 bg-base-100 p-4 rounded-lg mt-6"
        >
          <div className="form-control text-center flex flex-col items-center text-secondary p-2 ">
            <div className="">
              <User className="size-5 text-base-content/40" />
            </div>
            <h1>Create an Account</h1>
          </div>
          <div className="form-control mb-4 flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <div className="relative">
              <User className="absolute z-10 left-2 top-2 text-base-content/55" />
              <input
                placeholder="Enter your Full Name"
                name="fullName"
                type="text"
                className="input input-bordered w-full pl-10 "
              />
            </div>
          </div>

          <div className="form-control mb-4 flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute z-10 left-2 top-2 text-base-content/55" />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>

          <div className="form-control mb-4 flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-2 top-2 z-10 text-base-content/55" />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute right-2 top-2 z-10"
              >
                {showPassword ? (
                  <EyeOff className="z-10 text-base-content/55 hover:cursor-pointer" />
                ) : (
                  <Eye className="z-10 text-base-content/55 hover:cursor-pointer" />
                )}
              </button>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full pl-10 pr-10 "
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-secondary">
              Sign Up
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <p>Already have an account ?</p>
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;
