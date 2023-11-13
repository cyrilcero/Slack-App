import { Form } from "react-router-dom";

function LoginPage() {
  return (
    <>
      <h1 className="flex w-full justify-center items-center text-body text-SlackGreen">
        Hello World
      </h1>
      <LoginForm />
    </>
  );
}

function InputField({ label, type, name, id }) {
  return (
    <>
      <label htmlFor={name} className="w-full text-black pb-1 font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="w-full text-black bg-white border-spacing-4 border-2 border-none rounded-lg p-2 mb-2"
      />
    </>
  );
}

function LoginForm() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Form className="flex flex-col w-1/3 justify-center items-center bg-Horchata p-6 rounded-lg">
        <InputField
          label="Username"
          type="text"
          name="username"
          id="username"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          id="password"
        />
        <button
          type="submit"
          className="w-full bg-Aubergine text-White rounded-lg p-2 font-semibold mt-4"
          formAction="submit"
        >
          Login
        </button>
      </Form>
    </div>
  );
}

export default LoginPage;
