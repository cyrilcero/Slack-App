import { useEffect, useState } from "react";
import { Form, Link, NavLink, useNavigate } from "react-router-dom";
import { InputField } from "../LoginPage/components/InputField";
import { toastError, toastSuccess } from "../../utils/toasts";
import { setLocalStorage } from "../../utils/localstorage";

function SignUpPage() {
  return <SignUpForm />;
}

export default SignUpPage;

function SignUpForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(e) {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleAccountCreation(e) {
    e.preventDefault();

    const formData = {
      email: input.email,
      password: input.password,
      password_confirmation: input.password_confirmation,
    };

    try {
      const response = await fetch("http://206.189.91.54/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setData(data);
      /**
       * TODO: add loading states / effects
       */
      if (data.status === "error") {
        toastError(data.errors.full_messages[0]);
      } else {
        toastSuccess("Account Created Successfully");
      }
      setLocalStorage("SignUpData", data);
      // toastSuccess("Account Created");
      setInput({ email: "", password: "", password_confirmation: "" });
      navigate("/");
    } catch (error) {
      setError(error);
      toastError("Error");
      setInput({ email: "", password: "", password_confirmation: "" });
    }
  }

  useEffect(() => {
    console.log(data);
    console.log("Input", input);
  }, [data, input]);

  return (
    <>
      <div className="w-1/4 max-w-md">
        <div className="flex items-center justify-around w-full h-14 rounded-tl-lg rounded-tr-lg overflow-hidden shadow-md">
          <NavLink
            className="w-full h-full flex items-center justify-center bg-Horchata/[30%] font-bold text-lg"
            to={"/"}
          >
            Login
          </NavLink>
          <NavLink
            className="w-full h-full flex items-center justify-center bg-Horchata font-bold text-lg"
            to={"/sign-up"}
          >
            Signup
          </NavLink>
        </div>
        <Form
          onSubmit={handleAccountCreation}
          className="flex flex-col w-full justify-center items-center bg-Horchata p-6 rounded-bl-lg rounded-br-lg shadow-md"
        >
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
          <InputField
            placeholder="******"
            label="Re-type Password"
            type="password"
            name="password_confirmation"
            value={input.password_confirmation}
            handleInputChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full bg-Aubergine text-White rounded-lg p-2 font-semibold mt-4"
          >
            Sign Up
          </button>
          <span className="w-full py-2 text-center ">
            Already have an account? <Link to={"/"}>Login</Link>
          </span>
        </Form>
      </div>
    </>
  );
}
