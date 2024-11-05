type Props = {
  label?: string;
  placeholder: string;
  type: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
};

export const Input = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  multiple = false,
  ...otherProps
}: Props) => {
  return (
    <div>
      {label && (
        <label htmlFor={label} className={`block text-sm/6 text-gray-200`}>
          {label}
        </label>
      )}

      <div className="mt-2">
        <input
          {...otherProps}
          id={label}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          multiple={multiple}
          className="block w-full rounded-md border-0 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-slate-500 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-800 bg-neutral-700"
        />
      </div>
    </div>
  );
};
