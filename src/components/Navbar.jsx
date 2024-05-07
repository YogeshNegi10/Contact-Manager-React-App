import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";




const Navbar = () => {
  const [show, setshow] = useState(false);
  const {  favouriteUsers } = useSelector((state) => state.FavouriteContacts);
  const { users} = useSelector((state) => state.contacts);

 
  return (
 
      
      <div className=" flex overflow-hidden   bg-blue-200 ">
        <div
          className={`absolute z-50 md:hidden -translate-x-full bg-gray-800 text-white w-56 min-h-screen overflow-y-auto transition-transform transform ${show ? ' translate-x-0':''}  ease-in-out duration-300`}
          id="sidebar"
        >
          <div className="p-4">
            <h1 className="text-2xl font-semibold">Contact Manager</h1>
            <ul className="mt-10">
              <li className="mb-4">
                <NavLink   onClick={()=>{setshow(!show)}} to='/' className="block hover:text-indigo-400">
                  My Contacts ({users.length})
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink   onClick={()=>{setshow(!show)}} to='favourite' className="block hover:text-indigo-400">
                 My Favourites ({favouriteUsers.length})
                </NavLink>
              </li>
             
            </ul>
          </div>
        </div>

        <div className="flex-1 flex flex-col  overflow-hidden">
          <div className="bg-blue-400 shadow:md text-white">
            <div className="container mx-auto">
              <div className="flex justify-between items-center py-4 px-10">
                <NavLink to='/'><h1 className="text-2xl font-semibold">Contact Manager</h1></NavLink>
                 <ul className=" md:flex gap-8 hidden">
                 <NavLink to="/"> <li>My Contacts ({users.length})</li></NavLink>
                 <NavLink to="favourite"> <li>My Favourites ({favouriteUsers.length})</li></NavLink>
                  <li>About</li>
                  
                 </ul>
                <button
                 onClick={()=>{setshow(!show)}}
                  className="text-gray-500 hover:text-gray-600 md:hidden"
                  id="open-sidebar"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    
  );
};

export default Navbar;
