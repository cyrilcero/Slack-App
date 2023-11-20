import { useEffect, useState } from "react";
import { Form, Link, NavLink, useNavigate } from "react-router-dom";
import {
  useFetch,
  toastError,
  toastSuccess,
  setLocalStorage,
} from "../../utils";
import { InputField } from "./components/InputField";

function LoginForm() {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { data, response, error, loading, fetchAPI } = useFetch(
    "/auth/sign_in",
    {
      method: "POST",
      body: {
        email: input.email,
        password: input.password,
      },
    }
  );

  function handleInputChange(e) {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    fetchAPI();
  }

  useEffect(() => {
    if (!loading && data) {
      const header_data = {
        uid: response.headers.get("uid"),
        "access-token": response.headers.get("access-token"),
        expiry: response.headers.get("expiry"),
        client: response.headers.get("client"),
      };
      if (data.success === false) {
        toastError(data.errors[0]);
      } else {
        toastSuccess("Login Successful");
        setLocalStorage("LoginData", data);
        setLocalStorage("headerData", header_data);
        navigate("/app");
      }
      setInput({ email: "", password: "" });
    }
  }, [loading, data, response, navigate]);

  return (
    <>
      <div className="w-1/4 max-w-md min-w-[300px]">
        <div className="flex items-center justify-around w-full h-14 rounded-tl-lg rounded-tr-lg overflow-hidden shadow-md">
          <NavLink
            className="w-full h-full flex items-center justify-center bg-Horchata font-bold text-lg"
            to={"/"}
          >
            Login
          </NavLink>
          <NavLink
            className="w-full h-full flex items-center justify-center bg-Horchata/[30%] font-bold text-lg"
            to={"/sign-up"}
          >
            Signup
          </NavLink>
        </div>
        <Form
          onSubmit={handleLogin}
          className="flex flex-col w-full justify-center items-center bg-Horchata p-6 rounded-bl-lg rounded-br-lg shadow-md"
        >
          {/* <div className="h-10 w-full bg-red-700"></div> */}
          <InputField
            placeholder="email@gmail.com"
            label="Email"
            type="text"
            name="email"
            value={input.email}
            handleInputChange={handleInputChange}
          />
          <InputField
            placeholder="******"
            label="Password"
            type="password"
            name="password"
            value={input.password}
            handleInputChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full bg-Aubergine text-White rounded-lg p-2 font-semibold mt-4"
          >
            Login
          </button>
          <span className="w-full py-2 text-center ">
            Don't have an account? <Link to={"/sign-up"}>Signup</Link>
          </span>
        </Form>
      </div>
    </>
  );
}

function LoginPage() {
  return <LoginForm />;
}

export default LoginPage;
