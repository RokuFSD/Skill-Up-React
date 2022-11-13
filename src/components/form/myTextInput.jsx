import { useField } from 'formik';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col rounded-2xl py-3 w-full">
      <label className="mx-1 text-lg" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className="border border-gray-400 rounded-full px-2 py-2 w-full"
        {...field}
        {...props}
      />
      {/* {meta.touched && meta.error ? <div className="text-red-500">{meta.error}</div> : null} */}
    </div>
  );
};

export default MyTextInput;
