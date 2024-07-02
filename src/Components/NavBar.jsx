import React, { createContext } from 'react';
import Logo from '../assets/training-logo-red-RGB-237.png'

const Navbar = () => {
    return (
        <nav className="bg-white p-4 mb-3 shadow-sm">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                   <img src={Logo} alt="logo" />
                   
                </div>

              
                <div className="flex justify-center flex-grow gap-14">
                    <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-[#6F86AD] font-bold font-Mont hover:text-gray-400 ">
                        Search
                    </a>
                    <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-[#6F86AD] font-bold font-Mont hover:text-gray-400 ">
                        Reports
                    </a>
                    <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-[#6F86AD] font-bold font-Mont hover:text-gray-400 ">
                        Resources
                    </a>
                    <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-[#6F86AD] font-bold font-Mont hover:text-gray-400">
                        More
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
