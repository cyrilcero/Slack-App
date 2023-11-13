import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { InputField } from "../LoginPage/components/InputField";
import { toastError, toastSuccess } from "../../utils/toasts";

function SignUpPage() {
  return (
    <>
      <SignUpForm />
    </>
  );
}

export default SignUpPage;

function SignUpForm() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleAccountCreation = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
      password_confirmation: e.target.password_confirmation.value,
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
      toastSuccess("Account Created");
    } catch (error) {
      setError(error);
      toastError("Error");
    }
  };

  useEffect(() => {
    console.log(data);
    console.log(error);
  }, [data, error]);

  return (
    <Form
      onSubmit={handleAccountCreation}
      className="flex flex-col w-1/3 justify-center items-center bg-Horchata p-6 rounded-lg"
    >
      <InputField label={"Email Address"} name={"email"} type={"text"} />
      <InputField label={"Password"} name={"password"} type={"password"} />
      <InputField
        label={"Re-type Password"}
        name={"password_confirmation"}
        type={"password"}
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
