export function InputField({
  placeholder,
  label,
  type,
  name,
  value,
  handleInputChange,
}) {
  return (
    <>
      <label htmlFor={name} className="w-full text-black pb-1 font-semibold">
        {label}
      </label>
      <input
        onChange={handleInputChange}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        id={name}
        autoComplete="true"
        className="w-full text-black bg-white border-spacing-4 border-2 border-none rounded-lg p-2 mb-2"
      />
    </>
  );
}
