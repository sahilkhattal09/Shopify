type LogoutPopupProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const LogoutPopup: React.FC<LogoutPopupProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-72 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
        <p className="mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
