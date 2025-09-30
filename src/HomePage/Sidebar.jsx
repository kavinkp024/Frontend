import { useState } from 'react';
import { CgFormatJustify, CgUserList } from "react-icons/cg";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav>
      <button className='nav-side' onClick={() => setIsExpanded(!isExpanded)}>
        <CgFormatJustify size={25} />
      </button>
      {isExpanded && (
        <ul className='sidebar'>
          <li className='sidebar-d1'>
            <nav>
              <Link to="/task/create">
                <ul><CgUserList size={30} color='black' /></ul>
              </Link>
            </nav>
          </li> 
        </ul>
      )}
    </nav>
  );
};

export default Sidebar;