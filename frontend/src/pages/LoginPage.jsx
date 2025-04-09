import React from "react";
import { useRef } from "react";
import useAuthStore from "../store/useStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const formRef = useRef();
  const navigate = useNavigate();

  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(formRef.current);
    const formData = Object.fromEntries(data);

    await login(formData);

    navigate("/");

    formRef.current.reset();
  };

  return (
    <main>
      <div className="flex flex-col justify-center items-center h-screen bg-base-300">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-80 bg-base-100 p-4 rounded-lg"
        >
          <div className="form-control mb-4 flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-4 flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full "
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
