import { useState } from "react";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
      password_confirmation: e.target.passwordConfirm.value,
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
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" />
      <input name="password" type="password" />
      <input name="passwordConfirm" type="password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
