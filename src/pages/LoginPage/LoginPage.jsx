import { Form } from "react-router-dom";
import { InputField } from "./components/InputField";
import { useState, useEffect } from "react";
import SignUpPage from "../SignUpPage/SignUpPage";
import { toastError, toastSuccess } from "../../utils/toasts";

function LoginPage() {
  return (
    <>
      <h1 className="flex w-full justify-center items-center text-body text-SlackGreen">
        Hello World
      </h1>
      <div className="flex flex-col w-full justify-center items-center">
        <LoginForm />
        <SignUpPage />
      </div>
    </>
  );
}

function LoginForm() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch("http://206.189.91.54/api/v1/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setData(data);
      toastSuccess("Login Success");
    } catch (error) {
      setError(error);
      toastError("Login Unsuccessful");
    }
  };

  useEffect(() => {
    console.log(data);
    console.log(error);
  }, [data, error]);

  return (
    <Form
      onSubmit={handleLogin}
      className="flex flex-col w-1/3 justify-center items-center bg-Horchata p-6 rounded-lg"
    >
      <InputField label="Email" type="text" name="email" />
      <InputField label="Password" type="password" name="password" />
      <button
        type="submit"
        className="w-full bg-Aubergine text-White rounded-lg p-2 font-semibold mt-4"
        formAction="submit"
      >
        Login
      </button>
    </Form>
  );
}

export default LoginPage;
