import React from 'react';
import { FiAlertTriangle, FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface AlertProps {
    type: 'warning' | 'success' | 'error';
    message: string;
}

const alertConfig = {
    warning: { styles: 'bg-yellow-500 text-white', icon: FiAlertTriangle },
    success: { styles: 'bg-green-500 text-white', icon: FiCheckCircle },
    error: { styles: 'bg-red-500 text-white', icon: FiXCircle },
};

const Alert: React.FC<AlertProps> = ({ type, message }) => {
    const { styles, icon: Icon } = alertConfig[type];

    return (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded shadow-md ${styles}`}>
            <div className="flex items-center">
                <span className="text-sm font-medium">{message}</span>
                <Icon className="ml-2" size={16} />
            </div>
        </div>
    );
};

export default Alert;
