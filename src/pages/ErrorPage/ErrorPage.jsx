import { GoAlert } from "react-icons/go";

function ErrorPage() {
  return (
    <section>
      <div className="flex flex-col justify-center items-center w-full h-screen p-4 text-5xl">
        <div className="flex flex-col justify-center items-center bg-[#313338] p-12 rounded-lg text-white">
          <GoAlert className="text-9xl text-red-400" />
          <span className="font-bold my-4">Something is wrong? 🤔</span>
          <span className="text-base font-light italic text-gray-400">
            Please blame the developer
          </span>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
