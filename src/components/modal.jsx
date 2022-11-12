import Close from './svg/Close';

const Modal = ({ handleToggle, children }) => {
  return (
    <div className="absolute p-2 top-0 h-full w-full z-10 bg-gray-300 opacity-100">
      <div>
        {children}
        <button
          onClick={handleToggle}
          className="absolute right-1 top-16 rounded-full border-2 w-10 h-10 p-2 bg-gray-900">
          <Close />
        </button>
      </div>
    </div>
  );
};

export default Modal;
