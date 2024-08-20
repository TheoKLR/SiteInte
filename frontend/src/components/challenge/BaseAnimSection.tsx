import React, { useState } from 'react';

export interface AnimAction {
    title: string;
    form: JSX.Element;
}

export interface SectionProps {
    actions: AnimAction[];
}

const BaseAnimSection: React.FC<SectionProps> = ({ actions }) => {
    const [selectedAction, setSelectedAction] = useState<AnimAction | null>(null);

    const handleActionClick = (action: AnimAction) => {
        setSelectedAction(action);
    };

    return (
        <div className="container2">
            <div className="action-menu">
                {actions.map((action, index) => (
                    <div key={index}>
                        <button className="action-button" onClick={() => handleActionClick(action)}>
                            {action.title}
                        </button>
                    </div>
                ))}
            </div>
            <div className="form">
                {selectedAction && (
                    selectedAction.form
                )}
            </div>
        </div>
    );
};

export default BaseAnimSection;
