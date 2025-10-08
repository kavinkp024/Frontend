import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './Layout.css';


const Layout = () => {
    return (
        <div>
            <Sidebar />
            <div className='page'>
                <Header />
                <main>
                <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;



















// import React from 'react';
// import Header from '../Header/Header';
// import Sidebar from '../Sidebar/Sidebar';

// const Layout = () => {
//     return (
//         <div>
//             <Sidebar />
//             <div className='page'>
//                 <Header />
//             </div>
//         </div>
//     );
// };

// export default Layout;