import React from "react";

export const StringInput: React.FC<{ label: string }> = ({ label }) => {
    return (
        <div>
            <p>{label}</p>
            <input type="text" name={label} />
        </div>
    );
};

export const IntInput: React.FC<{ label: string }> = ({ label }) => {
    return (
        <div>
            <p>{label}</p>
            <input type="number" name={label} />
        </div>
    );
};