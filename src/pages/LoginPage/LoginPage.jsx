import { Form } from "react-router-dom";
import { InputField } from "./components/InputField";
import { useState, useEffect } from "react";
import SignUpPage from "../SignUpPage/SignUpPage";
import { toastError, toastSuccess } from "../../utils/toasts";
import { setLocalStorage } from "../../utils/localstorage";

function LoginPage() {
  return (
    <>
      <h1 className="flex w-full justify-center items-center text-body text-SlackGreen">
        *Still Under Development*
      </h1>
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <LoginForm />
        <SignUpPage />
      </div>
    </>
  );
}

function LoginForm() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
        accessToken: response.headers.get("access-token"),
        expiry: response.headers.get("expiry"),
        client: response.headers.get("client"),
      };
      const data = await response.json();
      setData(data);
      setLocalStorage("LoginData", data);
      setLocalStorage("headerData", header_data);
      /**
       * TODO: add error validator
       */

      if (data.success === false) {
        toastError(data.errors[0]);
      } else {
        toastSuccess("Successful Login");
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
    <Form
      onSubmit={handleLogin}
      className="flex flex-col w-1/3 justify-center items-center bg-Horchata p-6 rounded-lg"
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
      <button
        type="submit"
        className="w-full bg-Aubergine text-White rounded-lg p-2 font-semibold mt-4"
      >
        Login
      </button>
    </Form>
  );
}

export default LoginPage;
