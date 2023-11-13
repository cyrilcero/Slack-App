export function InputField({ label, type, name }) {
  return (
    <>
      <label htmlFor={name} className="w-full text-black pb-1 font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="w-full text-black bg-white border-spacing-4 border-2 border-none rounded-lg p-2 mb-2"
      />
    </>
  );
}
