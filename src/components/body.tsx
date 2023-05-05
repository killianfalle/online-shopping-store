import React from 'react';

interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <main>{children}</main>;
};

export default Body;