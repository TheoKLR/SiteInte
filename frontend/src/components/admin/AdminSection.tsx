import React, { useState } from 'react';
import "./AdminSection.css";

export interface AdminAction {
  title: string;
  form: JSX.Element;
}

export interface SectionProps {
  actions: AdminAction[];
}

const AdminSection: React.FC<SectionProps> = ({ actions }) => {
  const [selectedAction, setSelectedAction] = useState<AdminAction | null>(null);

  const handleActionClick = (action: AdminAction) => {
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

export default AdminSection;
