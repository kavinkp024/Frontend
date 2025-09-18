import { useState } from 'react';
import { FaWallet,FaCogs, FaUsers, FaBarcode} from 'react-icons/fa';

const Sidebar = () =>  {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <nav>
      <button className='nav-side' onClick={() => setIsExpanded(!isExpanded)}>
       <FaWallet size={20}/>
      </button>
      {isExpanded && (
        <ul className='sidebar'>
          <li className='sidebar-d1'><FaBarcode size={30} /></li> 
          <li className='sidebar-d1'><FaCogs  size={30}/></li>
          <li className='sidebar-d1'><FaUsers size={30}/></li>
        </ul>
      )}
    </nav> 
  );
};

export default Sidebar;