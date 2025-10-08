import { useState } from 'react';
import { CgProfile} from "react-icons/cg";

export default function Profile() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        <CgProfile size={25} />
      </button>
      {isExpanded && (
        <ul>
         <li >
          <p>Well Come User!</p>
         </li>
        </ul>
      )}
    </nav>
  );
};


