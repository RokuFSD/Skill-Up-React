import Loader from '../svg/Loader.jsx';
import { memo } from 'react';

const styles = {
  primary:
    'bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500 text-indigo-100 border border-indigo-500 px-4 py-1 rounded-full m-1',
  success:
    'bg-gradient-to-br from-green-400 via-green-500 to-green-500 text-green-100 border border-green-500 px-4 py-1 rounded-full m-1',
  submit:
    'bg-gradient-to-br from-green-400 via-green-500 to-green-500 text-green-100 border border-green-500 px-4 py-1 rounded-full m-1',
  error:
    'bg-gradient-to-br from-red-400 via-red-500 to-red-500 text-red-100 border border-red-500 px-4 py-1 rounded-full m-1',
  neutral:
    'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-800 text-gray-100 px-4 py-1 rounded-full m-1',
  premium:
    'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-500 text-yellow-100 border border-yellow-500 px-4 py-1 rounded-full m-1',
  transparent: 'bg-transparent text-gray-100',
  disabled:
    'cursor-not-allowed bg-gray-200 text-gray-500 border border-gray-200 hover:text-gray-500 px-4 py-1 rounded-full m-1'
};

function Button({
  onClick,
  disabled = false,
  type= 'button',
  style = 'primary',
  loading = false,
  children,
  extraClasses = ''
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center p-0 text-base font-medium text-center  rounded-lg shadow-sm cursor-pointer hover:text-white ${
        disabled || loading ? styles.disabled : styles[style]
      } ${extraClasses}`}>
      <span className="relative flex gap-2">
        {loading ? (
          <>
            <Loader /> Loading...
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}

export default memo(Button);
