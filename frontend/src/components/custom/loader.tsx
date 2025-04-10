"use client";

import React from "react";

const Loading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    return isLoading ? (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-50 transition-opacity duration-500">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
        </div>
    ) : null;
};

export default Loading;
