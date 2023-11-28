import Picture from "../../assets/Warning.png";

function FAQ() {
  return (
    <section className="flex w-full h-screen flex-col justify-center items-center">
      <div className="">
        <h1 className="text-center text-3xl font-bold py-8">
          Frequently Asked Questions:
        </h1>
        <ul>
          <li className="text-lg font-semibold py-4">
            1. How can I enable API requests
          </li>
          <img src={Picture} alt="picture" />
        </ul>
      </div>
    </section>
  );
}

export default FAQ;
