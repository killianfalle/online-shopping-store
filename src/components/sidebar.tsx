import { FC, useContext } from "react";
import { Context } from "../context/context";
import "../assets/sidebar.css"

const Sidebar: FC<SidebarProps> = ({ categories }) => {
  const {category, setCategory} = useContext(Context);

  const handleChangeCategory = (category: string) => {
    setCategory(category)
  }

  return (
    <aside>
      <nav>
        <ul>
          {categories.map((item, index) => (
            <li
              key={index}
              onClick={() => handleChangeCategory(item)}
              className={item === category ? "active" : ""}>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

interface SidebarProps {
  categories: string[];
}

export default Sidebar;