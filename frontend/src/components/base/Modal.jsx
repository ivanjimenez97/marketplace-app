// Modal.jsx
const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
      <div className="bg-white rounded-lg p-3 shadow-lg relative">
        <div className="header border-b mb-4">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
          <h4 className="text-red-500 font-bold text-lg mb-2">{title}</h4>
        </div>
        <div className="content">{children}</div>
        <div className="mt-4 flex justify-between footer border-t pt-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 hover:bg-green-500 focus:bg-green-900 focus:text-white px-5 py-3 rounded-lg text-white font-bold"
            onClick={onConfirm}
          >
            Yes, Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
