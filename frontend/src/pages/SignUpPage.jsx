import { useRef } from "react";
import useAuthStore from "../store/useStore";

const SignUpPage = () => {
  const { signup } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    const formData = Object.fromEntries(data);

    const res = await signup(formData);
    console.log(res);

    formRef.current.reset();
  };

  const formRef = useRef();

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
              <span className="label-text">Full Name</span>
            </label>
            <input
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              className="input input-bordered w-full "
            />
          </div>

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

export default SignUpPage;
