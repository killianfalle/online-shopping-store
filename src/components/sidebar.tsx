import React from 'react';

interface SidebarProps {
  links: { label: string; url: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  return (
    <aside>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;