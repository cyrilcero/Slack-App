import { useState, useEffect } from "react";
import { Form, Link, NavLink, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../utils/toasts";
import { InputField } from "./components/InputField";
import SignUpPage from "../SignUpPage/SignUpPage";
import { setLocalStorage } from "../../utils/localstorage";

function LoginPage() {
  return <LoginForm />;
}

function LoginForm() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  function handleInputChange(e) {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();

    const formData = {
      email: input.email,
      password: input.password,
    };

    try {
      const response = await fetch("http://206.189.91.54/api/v1/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const header_data = {
        uid: response.headers.get("uid"),
        "access-token": response.headers.get("access-token"),
        expiry: response.headers.get("expiry"),
        client: response.headers.get("client"),
      };
      const data = await response.json();
      setData(data);

      // error handle the reponse
      if (data.success === false) {
        toastError(data.errors[0]);
      } else {
        toastSuccess("Login Successful");
        setLocalStorage("LoginData", data);
        setLocalStorage("headerData", header_data);
        nav("/app");
      }

      setInput({ email: "", password: "" });
    } catch (error) {
      setError(error);
      toastError("Login Unsuccessful");
      setInput({ email: "", password: "" });
    }
  }

  useEffect(() => {
    console.log("INPUT", input);
  }, [input]);

  return (
    <>
      <div className="w-1/3">
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

export default LoginPage;
