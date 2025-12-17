import React from "react";

const Modal = ({ children, onClose }) => {
	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg">
				{children}
				<button
					className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default Modal;
