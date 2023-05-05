import React from 'react';
import "../assets/sidebar.css"

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  return (
    <aside>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index} className={index === 1 ? "active" : ""}>
              <p>{link.label}</p>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

interface SidebarProps {
  links: { label: string; type: string }[];
}

export default Sidebar;