import { createContext, useContext, useState} from "react";

const AlertContext = createContext({
  showAlert: () => {},
  showConfirm: () => {},
});

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState({ message: "" });

  const showAlert = (opts) => {
    setOptions({ ...opts, type: opts.type || "info" });
    setVisible(true);
  };

  const showConfirm = (opts) => {
    setOptions({ ...opts, type: "confirm" });
    setVisible(true);
  };

  const handleClose = () => setVisible(false);

  const handleConfirm = () => {
    if (options.onConfirm) options.onConfirm();
    setVisible(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      {visible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white !text-text rounded shadow p-6 w-96">
            <p className="mb-4">{options.message}</p>
            {options.type === "confirm" ? (
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 !text-text bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 !text-text bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Confirm
                </button>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};
