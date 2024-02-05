import React from 'react';

const Popup = ({isOpen, onClose, content, key}) => {
    return (
        <>
        {isOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
                <div className="flex justify-center items-center bg-gray-200 bg-opacity-85 p-8 rounded shadow-md w-1/4 h-2/4">
                    <div className="flex flex-col items-center justify-center">
                        {content}
                        <button
                            onClick={onClose}
                            className="bottom-0 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                            Close Popup
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}


export default Popup;