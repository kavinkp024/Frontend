import { CgUserAdd, CgUserList } from "react-icons/cg";
import { FaLaptop } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {

  return (
    <nav>
      {(
          <ul className='sidebar'>
            <li className='fc-name'> 
              <FaLaptop size={50} />
              INNOVIEW
              software development team.
            </li>
            <li className='sidebar-d1'>
              <nav>
                <Link to="/task/create">
                  <button className="side-but">
                    Create<CgUserAdd size={25} color='black' />
                  </button>
                </Link>
              </nav>
            </li>
            <li className='sidebar-d1'>
              <nav>
                <Link to="/task/list">
                  <button className="side-but">
                    Table< CgUserList size={25} color='black' />
                  </button>
                </Link>
              </nav>
            </li>
          </ul>
      )}
    </nav>
  );
};

export default Sidebar;