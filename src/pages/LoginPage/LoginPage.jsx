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

function LoginForm() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Form className="flex flex-col w-1/3 justify-center items-center bg-Horchata p-8 rounded-lg">
        <label htmlFor="" className="w-full text-black py-1 font-semibold">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="w-full text-black bg-white border-spacing-4 border-2 border-solid rounded-md p-1 mb-2"
        />
        <label htmlFor="" className="w-full text-black py-1 font-semibold">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full text-black bg-white border-spacing-4 border-2 border-solid rounded-md p-1 mb-2"
        />
        <button type="submit" className="w-full bg-Aubergine rounded-lg p-2 font-semibold">Login</button>
      </Form>
    </div>
  );
}

export default LoginPage;
