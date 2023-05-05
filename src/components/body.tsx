import React from 'react';
import "../assets/body.css"

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <div className="body-container">
      {children}
    </div>
  );
};

interface BodyProps {
  children: React.ReactNode;
}

export default Body;