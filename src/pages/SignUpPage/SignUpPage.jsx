import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { InputField } from "../LoginPage/components/InputField";
import { toastError, toastSuccess } from "../../utils/toasts";
import { setLocalStorage } from "../../utils/localstorage";

function SignUpPage() {
  return (
    <>
      <SignUpForm />
    </>
  );
}

export default SignUpPage;

function SignUpForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
       * TODO: add error validator
       */
      if (data.status === "error") {
        toastError(data.errors.full_messages[0]);
      } else {
        toastSuccess("Account Created Successfully");
      }
      setLocalStorage("SignUpData", data);
      // toastSuccess("Account Created");
      setInput({ email: "", password: "", password_confirmation: "" });
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
    <Form
      onSubmit={handleAccountCreation}
      className="flex flex-col w-1/3 justify-center items-center bg-Horchata p-6 rounded-lg"
    >
      <InputField
        placeholder="email@gmail.com"
        label="Email Address"
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
    </Form>
  );
}
