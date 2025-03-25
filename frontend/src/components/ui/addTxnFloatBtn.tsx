import React from "react";
import { Plus } from "lucide-react";

const AddTransactionFloatingBtn: React.FC = () => {
    return (
        <div className="relative group">
            <button
                className="fixed bottom-6 left-6 flex items-center justify-center w-14 h-14 bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white rounded-full shadow-lg transition duration-300 animate-float"
                // title="Add Transaction"
                onClick={() => alert("Add Transaction Clicked!")} // Replace with navigation or modal trigger
            >
                <Plus size={24} />
            </button>
            {/* ToolTip */}
            {/* <span className="fixed bottom-16 left-8 z-50 ml-12 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition"> */}
            <span className="fixed bottom-16 left-10 z-50 bg-gray-700 text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition before:content-[''] before:absolute before:-bottom-2 before:left-3 before:border-4 before:border-transparent before:border-t-gray-700">
                Add Transaction
            </span>
        </div>
    );
};

export default AddTransactionFloatingBtn;
