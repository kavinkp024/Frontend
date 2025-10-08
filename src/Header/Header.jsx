  import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import './Header.css';


    const Header = () => {
      return (             
      <header>
        <div className='Header'>
          <nav>
            <Link to={`/user/profile/edit`}>
              <button className="profile"><CgProfile size={25} /></button>
            </Link>
          </nav>
        </div>
        </header>
      );
    };

    export default Header;